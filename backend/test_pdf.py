"""
Quick test — run this in backend folder:
  python test_pdf.py "C:\path\to\your\resume.pdf"
"""
import sys, io

if len(sys.argv) < 2:
    print("Usage: python test_pdf.py path/to/resume.pdf")
    sys.exit(1)

path = sys.argv[1]
with open(path, 'rb') as f:
    pdf_bytes = f.read()

print(f"File size: {len(pdf_bytes)} bytes\n")

# Test 1: pdfplumber
print("=== pdfplumber ===")
try:
    import pdfplumber
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        print(f"Pages: {len(pdf.pages)}")
        text = ''
        for i, page in enumerate(pdf.pages):
            t = page.extract_text(x_tolerance=3, y_tolerance=3) or page.extract_text() or ''
            text += t + '\n'
            print(f"  Page {i+1}: {len(t)} chars")
    print(f"Total: {len(text.strip())} chars")
    if text.strip():
        print("PREVIEW:", text[:200])
    else:
        print("RESULT: EMPTY — pdfplumber extracted nothing")
except Exception as e:
    print(f"ERROR: {e}")

# Test 2: PyPDF2
print("\n=== PyPDF2 ===")
try:
    import PyPDF2
    reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
    text = ''
    for i, page in enumerate(reader.pages):
        t = page.extract_text() or ''
        text += t
        print(f"  Page {i+1}: {len(t)} chars")
    print(f"Total: {len(text.strip())} chars")
    if text.strip():
        print("PREVIEW:", text[:200])
    else:
        print("RESULT: EMPTY")
except Exception as e:
    print(f"ERROR: {e}")

# Test 3: pypdf
print("\n=== pypdf ===")
try:
    from pypdf import PdfReader
    reader = PdfReader(io.BytesIO(pdf_bytes))
    text = ''
    for i, page in enumerate(reader.pages):
        t = page.extract_text() or ''
        text += t
        print(f"  Page {i+1}: {len(t)} chars")
    print(f"Total: {len(text.strip())} chars")
    if text.strip():
        print("PREVIEW:", text[:200])
    else:
        print("RESULT: EMPTY")
except Exception as e:
    print(f"ERROR: {e}")
