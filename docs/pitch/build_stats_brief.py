#!/usr/bin/env python3
"""Genera il PDF di briefing per la CEO: modifiche alle statistiche, fonti e motivi."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUTDIR = os.path.dirname(os.path.abspath(__file__))
INK = HexColor("#0F0F12"); TEAL = HexColor("#143F36"); LIME = HexColor("#D2EC7C")
GREY = HexColor("#5A5A5A"); CORAL = HexColor("#FF6B5C"); PALE = HexColor("#F4F8E6")

styles = getSampleStyleSheet()
EYE = ParagraphStyle("eye", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8, textColor=TEAL, spaceAfter=2)
TITLE = ParagraphStyle("t", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=20, textColor=INK, leading=24, alignment=TA_LEFT, spaceAfter=4)
META = ParagraphStyle("m", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, textColor=GREY, spaceAfter=14)
INTRO = ParagraphStyle("i", parent=styles["Normal"], fontName="Helvetica", fontSize=10.5, textColor=INK, leading=16, spaceAfter=6)
SEC = ParagraphStyle("s", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, textColor=TEAL, leading=16, spaceBefore=14, spaceAfter=6)
LBL = ParagraphStyle("l", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, textColor=INK, leading=12)
VAL = ParagraphStyle("v", parent=styles["Normal"], fontName="Helvetica", fontSize=9.5, textColor=INK, leading=13)
BODY = ParagraphStyle("b", parent=styles["Normal"], fontName="Helvetica", fontSize=10, textColor=INK, leading=15, spaceAfter=6)
SMALL = ParagraphStyle("sm", parent=styles["Normal"], fontName="Helvetica-Oblique", fontSize=8.5, textColor=GREY, leading=12)


def hf(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica-Bold", 10); canvas.setFillColor(TEAL)
    canvas.drawString(20 * mm, A4[1] - 14 * mm, "BAB")
    canvas.setFont("Helvetica", 7); canvas.setFillColor(GREY)
    canvas.drawString(28 * mm, A4[1] - 14 * mm, "Breaking All Barriers · Briefing interno")
    canvas.setStrokeColor(LIME); canvas.setLineWidth(2)
    canvas.line(20 * mm, A4[1] - 16 * mm, A4[0] - 20 * mm, A4[1] - 16 * mm)
    canvas.setFont("Helvetica", 7); canvas.setFillColor(GREY)
    canvas.drawString(20 * mm, 12 * mm, "Documento interno — non destinato alla pubblicazione")
    canvas.drawRightString(A4[0] - 20 * mm, 12 * mm, f"Pag. {doc.page}")
    canvas.restoreState()


def stat_block(num_color, prima, dopo, fonte, motivo):
    rows = [
        [Paragraph("PRIMA", LBL), Paragraph(prima, VAL)],
        [Paragraph("DOPO", LBL), Paragraph(dopo, VAL)],
        [Paragraph("FONTE", LBL), Paragraph(fonte, VAL)],
        [Paragraph("PERCHÉ", LBL), Paragraph(motivo, VAL)],
    ]
    t = Table(rows, colWidths=[24 * mm, 146 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 1, INK),
        ("LINEBEFORE", (0, 0), (0, -1), 3, num_color),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, HexColor("#CCCCCC")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


out = os.path.join(OUTDIR, "BAB-Statistiche-Fonti-CEO.pdf")
doc = SimpleDocTemplate(out, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm,
                        topMargin=24 * mm, bottomMargin=20 * mm,
                        title="BAB — Aggiornamento statistiche: fonti e motivazioni", author="Breaking All Barriers")
S = []
S.append(Paragraph("BRIEFING INTERNO · DATI E FONTI", EYE))
S.append(Paragraph("Aggiornamento delle statistiche del sito", TITLE))
S.append(Paragraph("Giugno 2026 · preparato per la revisione della CEO", META))

S.append(Paragraph(
    "Ho verificato le tre statistiche pubblicate sulla landing (93% / 6% / 0%) tramite una ricerca "
    "approfondita sulle fonti accademiche, con verifica incrociata. <b>Risultato: le fonti esistono tutte, "
    "ma due statistiche su tre erano imprecise</b> e potevano essere contestate da un interlocutore esperto "
    "(dirigente sportivo, investitore, clinico). Le ho aggiornate con versioni difendibili e citabili. "
    "Di seguito cosa è cambiato, la fonte e il motivo.", INTRO))
S.append(HRFlowable(width="100%", thickness=1, color=HexColor("#DDDDDD"), spaceBefore=8, spaceAfter=4))

S.append(Paragraph("① Salute mestruale e performance", SEC))
S.append(stat_block(
    CORAL,
    "«93% — Ha vissuto un'esperienza negativa legata al ciclo mestruale nello sport»",
    "«77% — Ritiene che il ciclo mestruale influenzi negativamente la performance atletica»",
    "Jones, Bishop et al. (2024) — 128 atlete d'élite britanniche di atletica leggera; 76,8% riferisce "
    "un impatto negativo del ciclo sulla performance (studio peer-reviewed, PMC10912517).",
    "Il 93% proveniva da Findlay et al. (2020), uno studio qualitativo su <b>sole 15 rugbiste</b>, e si "
    "riferiva ai <b>sintomi</b> del ciclo, non a un'«esperienza negativa». Generalizzarlo a «le atlete» era "
    "un'esagerazione. Il 76,8% poggia su un campione 8 volte più grande ed è direttamente sul punto "
    "(impatto sulla performance)."))

S.append(Paragraph("② Quanto la ricerca studia le donne", SEC))
S.append(stat_block(
    CORAL,
    "«6% — Della ricerca sportiva riguarda la salute femminile»",
    "«6% — Della ricerca sportiva totale è condotta esclusivamente su atlete donne»",
    "Cowley et al. (2021), «Invisible Sportswomen», <i>Women in Sport and Physical Activity Journal</i> "
    "29(2):146–151 — su 5.261 pubblicazioni, il 6% usa campioni di sole donne (DOI 10.1123/wspaj.2021-0028).",
    "Il numero (6%) era corretto, ma la <b>descrizione era sbagliata</b>: il 6% indica gli studi condotti "
    "<b>solo su partecipanti donne</b>, non la ricerca «sulla salute femminile». Bastava correggere il testo "
    "per renderlo accurato."))

S.append(Paragraph("③ Ricerca sulle atlete adolescenti", SEC))
S.append(stat_block(
    CORAL,
    "«0% — La ricerca sportiva sulle atlete adolescenti è quasi inesistente»",
    "«Quasi inesistente — La ricerca scientifica sugli infortuni delle atlete adolescenti»",
    "Horan et al. (2024), <i>Sports Medicine</i> — revisione sistematica: solo <b>32 studi</b> sugli infortuni "
    "nelle atlete under-19, quasi tutti nel calcio (DOI 10.1007/s40279-023-01988-w).",
    "Non esiste uno «0%» pubblicato: era una cifra retorica e quindi attaccabile. «Quasi inesistente» è una "
    "parafrasi corretta e sostenuta dai dati (32 studi in tutto), e mantiene la stessa forza comunicativa "
    "senza esporci a una contestazione sul numero."))

S.append(Spacer(1, 10))
S.append(HRFlowable(width="100%", thickness=1, color=HexColor("#DDDDDD"), spaceAfter=6))
S.append(Paragraph(
    "<b>In sintesi:</b> il messaggio resta identico e forte, ma ora ogni numero è collegato a una fonte "
    "accademica reale e citabile — pronto per pitch, investitori e dirigenti. La riga «Fonti» è già pubblicata "
    "sotto le statistiche sul sito.", BODY))
S.append(Paragraph(
    "Riferimenti completi: Findlay 2020 (BJSM 54:1108) · Jones/Bishop 2024 (PMC10912517) · Ekenros 2022 "
    "(PMC9468598) · Cowley 2021 (WSPAJ 29:146, DOI 10.1123/wspaj.2021-0028) · Costello 2014 (EJSS 14:847, "
    "benchmark storico 39%) · Horan 2024 (Sports Medicine, DOI 10.1007/s40279-023-01988-w).", SMALL))

doc.build(S, onFirstPage=hf, onLaterPages=hf)
print("creato:", out)
