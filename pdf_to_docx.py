import fitz
from docx import Document
from docx.shared import Inches
import os

def convert_pdf_to_docx(pdf_path, output_docx):
    doc = fitz.open(pdf_path)
    word_doc = Document()
    
    # Adjust section margins to be zero for full-page images
    section = word_doc.sections[0]
    section.top_margin = Inches(0)
    section.bottom_margin = Inches(0)
    section.left_margin = Inches(0)
    section.right_margin = Inches(0)
    
    temp_dir = "temp_pdf_frames"
    os.makedirs(temp_dir, exist_ok=True)
    
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        img_path = f"{temp_dir}/page_{i}.png"
        pix.save(img_path)
        
        # Add image
        # Word slides are usually 8.5x11, we scale to fit width
        word_doc.add_picture(img_path, width=Inches(8.5))
        print(f"Processed page {i+1}")
        
    word_doc.save(output_docx)
    print(f"Saved DOCX to {output_docx}")

if __name__ == "__main__":
    src = "/Users/vikashvardhan/IdeaProjects/PaperResearch/all data/oldimages/AuraGuide_NotebookLM_v4.pdf"
    dest = "FINAL_Pitchdeck/AuraGuide_PitchDeck_v4.docx"
    convert_pdf_to_docx(src, dest)
