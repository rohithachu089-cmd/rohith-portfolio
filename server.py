import http.server
import socketserver
import socket
import os
import re
import mimetypes

PORT = 3000

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        path = self.translate_path(self.path)
        is_media = path.lower().endswith(('.mp3', '.m4a', '.mp4', '.webm', '.ogg', '.wav', '.jpg', '.jpeg', '.png', '.webp'))
        if not is_media:
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        else:
            self.send_header('Cache-Control', 'public, max-age=86400')
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path):
            return super().send_head()

        ctype = self.guess_type(path)
        if path.lower().endswith('.mp3'):
            ctype = 'audio/mpeg'
        elif path.lower().endswith('.m4a'):
            ctype = 'audio/mp4'
        elif path.lower().endswith('.mp4'):
            ctype = 'video/mp4'

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        total_len = fs.st_size

        range_header = self.headers.get('Range', '')
        if range_header.startswith('bytes='):
            match = re.match(r'bytes=(\d+)-(\d*)', range_header)
            if match:
                start = int(match.group(1))
                end = int(match.group(2)) if match.group(2) else total_len - 1
                if start >= total_len:
                    self.send_error(416, "Requested Range Not Satisfiable")
                    f.close()
                    return None
                end = min(end, total_len - 1)
                content_length = end - start + 1

                self.send_response(206)
                self.send_header('Content-Type', ctype)
                self.send_header('Content-Range', f'bytes {start}-{end}/{total_len}')
                self.send_header('Content-Length', str(content_length))
                self.send_header('Last-Modified', self.date_time_string(fs.st_mtime))
                self.end_headers()

                f.seek(start)

                class RangeFile:
                    def __init__(self, fp, length):
                        self.fp = fp
                        self.remaining = length

                    def read(self, size=-1):
                        if self.remaining <= 0:
                            return b''
                        if size < 0 or size > self.remaining:
                            size = self.remaining
                        chunk = self.fp.read(size)
                        if not chunk:
                            self.remaining = 0
                            return b''
                        self.remaining -= len(chunk)
                        return chunk

                    def close(self):
                        self.fp.close()

                return RangeFile(f, content_length)

        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(total_len))
        self.send_header('Last-Modified', self.date_time_string(fs.st_mtime))
        self.end_headers()
        return f

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
            pass
        finally:
            if hasattr(source, 'close'):
                try:
                    source.close()
                except Exception:
                    pass

    def log_message(self, format, *args):
        # Clean logging
        super().log_message(format, *args)

def get_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    local_ip = get_ip()
    with ThreadingHTTPServer(("", PORT), RangeHTTPRequestHandler) as httpd:
        print(f"Local URL:   http://localhost:{PORT}")
        print(f"Network URL: http://{local_ip}:{PORT}")
        httpd.serve_forever()
