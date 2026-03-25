#!/usr/bin/env python3
"""
Simple HTTP Server for Portfolio Website
Run this script to host your portfolio locally on your server laptop
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add cache control headers
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Enhanced logging
        print(f"[{self.log_date_time_string()}] {format % args}")


def run_server():
    print(f"\n{'='*60}")
    print("Portfolio Website Server")
    print(f"{'='*60}\n")
    print(f"Serving from: {DIRECTORY}")
    print(f"Server running at: http://127.0.0.1:{PORT}")
    print(f"Open your browser and visit: http://127.0.0.1:{PORT}\n")
    print("To access from another device on your network:")
    print("  Find your server laptop's IP and use: http://<your-laptop-ip>:{}\n".format(PORT))
    print("Press Ctrl+C to stop the server\n")
    print(f"{'='*60}\n")
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")
            sys.exit(0)


if __name__ == "__main__":
    run_server()
