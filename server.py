import http.server
import socket
import socketserver
import webbrowser
import os
import sys

# Ensure working directory is the website folder
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

local_ip = get_ip()

print("=" * 60)
print("            BRUSK IT - LOCAL WEB SERVER")
print("=" * 60)
print()
print(f"  * On this Computer:  http://localhost:{PORT}")
print(f"  * On your Mobile:    http://{local_ip}:{PORT}")
print()
print(f"  --> Type this on your phone's browser: http://{local_ip}:{PORT}")
print("      (Make sure your phone is on the same Wi-Fi network)")
print()
print("  Close this window or press Ctrl+C to stop the server.")
print("=" * 60)
print()

# Automatically open PC browser
try:
    webbrowser.open(f"http://localhost:{PORT}")
except Exception:
    pass

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent mobile browser caching issues during testing
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
try:
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    sys.exit(0)
