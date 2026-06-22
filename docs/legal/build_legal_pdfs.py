#!/usr/bin/env python3
"""Genera i PDF legali BAB (Privacy, Cookie, Termini) dai contenuti in src/locales/it.json."""
import json
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LOCALE = os.path.join(ROOT, "src", "locales", "it.json")
OUTDIR = os.path.dirname(os.path.abspath(__file__))

INK = HexColor("#0F0F12")
TEAL = HexColor("#143F36")
LIME = HexColor("#D2EC7C")
GREY = HexColor("#5A5A5A")

legal = json.load(open(LOCALE, encoding="utf-8"))["legal"]

styles = getSampleStyleSheet()
H_EYEBROW = ParagraphStyle("eyebrow", parent=styles["Normal"], fontName="Helvetica-Bold",
                           fontSize=8, textColor=TEAL, leading=11, spaceAfter=2, tracking=1)
H_TITLE = ParagraphStyle("title", parent=styles["Title"], fontName="Helvetica-Bold",
                         fontSize=22, textColor=INK, leading=26, spaceAfter=4, alignment=TA_LEFT)
H_META = ParagraphStyle("meta", parent=styles["Normal"], fontName="Helvetica",
                        fontSize=8.5, textColor=GREY, leading=12, spaceAfter=14)
H_INTRO = ParagraphStyle("intro", parent=styles["Normal"], fontName="Helvetica",
                         fontSize=10.5, textColor=INK, leading=16, spaceAfter=16)
H_SEC = ParagraphStyle("sec", parent=styles["Heading2"], fontName="Helvetica-Bold",
                       fontSize=12, textColor=TEAL, leading=15, spaceBefore=10, spaceAfter=4)
H_BODY = ParagraphStyle("body", parent=styles["Normal"], fontName="Helvetica",
                        fontSize=10, textColor=INK, leading=15, spaceAfter=4, alignment=TA_LEFT)
H_CONTACT = ParagraphStyle("contact", parent=styles["Normal"], fontName="Helvetica-Oblique",
                           fontSize=9.5, textColor=INK, leading=14, spaceBefore=12)
H_DRAFT = ParagraphStyle("draft", parent=styles["Normal"], fontName="Helvetica-Bold",
                         fontSize=8.5, textColor=INK, leading=12)

DRAFT_NOTE = ("BOZZA da revisionare. Documento predisposto come base: prima della pubblicazione "
              "va validato da un consulente legale e completati i dati mancanti (ragione sociale "
              "completa, sede legale, P.IVA, foro competente).")


def header_footer(canvas, doc):
    canvas.saveState()
    # Header: marchio testuale
    canvas.setFont("Helvetica-Bold", 10)
    canvas.setFillColor(TEAL)
    canvas.drawString(20 * mm, A4[1] - 14 * mm, "BAB")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(GREY)
    canvas.drawString(28 * mm, A4[1] - 14 * mm, "Breaking All Barriers")
    canvas.setStrokeColor(LIME)
    canvas.setLineWidth(2)
    canvas.line(20 * mm, A4[1] - 16 * mm, A4[0] - 20 * mm, A4[1] - 16 * mm)
    # Footer: pagina + copyright
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(GREY)
    canvas.drawString(20 * mm, 12 * mm, "BAB — Breaking All Barriers · © 2026")
    canvas.drawRightString(A4[0] - 20 * mm, 12 * mm, f"Pag. {doc.page}")
    canvas.restoreState()


def build(doc_key, filename):
    data = legal[doc_key]
    out = os.path.join(OUTDIR, filename)
    doc = SimpleDocTemplate(out, pagesize=A4,
                            leftMargin=20 * mm, rightMargin=20 * mm,
                            topMargin=24 * mm, bottomMargin=20 * mm,
                            title=f"{data['title']} — BAB", author="Breaking All Barriers")
    story = []
    story.append(Paragraph("BREAKING ALL BARRIERS", H_EYEBROW))
    story.append(Paragraph(data["title"], H_TITLE))
    story.append(Paragraph(f"{legal['updatedLabel']} {data['updated']}", H_META))

    # Riquadro bozza
    draft_tbl = Table([[Paragraph(DRAFT_NOTE, H_DRAFT)]], colWidths=[170 * mm])
    draft_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#FBF7DF")),
        ("BOX", (0, 0), (-1, -1), 1, INK),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(draft_tbl)
    story.append(Spacer(1, 12))

    story.append(Paragraph(data["intro"], H_INTRO))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor("#DDDDDD"), spaceAfter=8))

    for s in data["sections"]:
        story.append(Paragraph(s["h"], H_SEC))
        for para in s["p"].split("\n"):
            if para.strip():
                story.append(Paragraph(para.strip(), H_BODY))

    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor("#DDDDDD"), spaceAfter=6))
    story.append(Paragraph(legal["contact"], H_CONTACT))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print("creato:", out)


build("privacy", "BAB-Informativa-Privacy.pdf")
build("cookie", "BAB-Cookie-Policy.pdf")
build("terms", "BAB-Termini-e-Condizioni.pdf")
print("Fatto.")
