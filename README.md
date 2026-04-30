# Trinethra Supervisor Feedback Analyzer

## Overview

This application analyzes supervisor feedback transcripts and generates structured performance insights for Fellows.

In the current workflow, a psychology intern spends 45 to 60 minutes reading a transcript and writing an assessment. This tool reduces that effort to a few seconds by generating a structured draft using a local language model.

The system is designed as a decision-support tool. The AI generates a draft analysis, but the final judgment is made by the human reviewer.

---

## Problem Statement

Supervisor feedback is currently:
- Unstructured
- Time-consuming to analyze
- Subject to bias and inconsistency

The goal is to:
- Extract structured insights
- Map feedback to a rubric
- Identify missing evaluation dimensions
- Suggest next-step questions

---

## Features

- Paste or select supervisor transcript
- AI-generated structured analysis
- Evidence extraction with sentiment tagging
- Rubric scoring (1–10) with justification
- KPI mapping based on transcript
- Gap detection (what is not mentioned)
- Suggested follow-up questions
- Dropdown for sample transcripts
- Fully local execution (no cloud APIs)

---

## Architecture

Frontend: React  
Backend: Node.js with Express  
LLM: Llama 3.2 via Ollama  

Flow:
User Input → Backend → Ollama API → Structured JSON → Frontend Display

---

## Model Used

This project uses Llama 3.2 through Ollama.

Reasons:
- Strong reasoning capability
- Better handling of long, unstructured text
- More consistent structured output

Tradeoffs:
- Slower inference compared to smaller models
- Typical response time: 10–30 seconds depending on hardware

---

## Setup Instructions

### 1. Install Ollama
Download and install from:
https://ollama.com

---

### 2. Pull Model

Run in terminal:

```bash
ollama pull llama3.2

### Start Backend
cd backend
npm run server

### Start Frontend
cd frontend
npm install
npm start

## How to Use

1. Select a sample transcript or paste your own  
2. Click "Run Analysis"  
3. Wait for model response  
4. Review generated output:
   - Evidence  
   - Score  
   - KPIs  
   - Gaps  
   - Follow-up questions  

---

## Sample Transcripts

The project includes three test cases:

### Karthik
- Mixed performance  
- Expected score: 6–7  

### Meena
- Critical feedback but strong system-building  
- Expected score: 7–8  

### Anil
- Highly praised but dependent role  
- Expected score: 5–6  

These test cases help evaluate:
- Bias handling  
- Depth of reasoning  
- Gap detection  

---

## Key Design Decisions

### 1. Single Prompt vs Multiple Prompts

Decision: Single prompt  

Reason:
- Lower latency  
- Simpler implementation  
- Adequate performance for MVP  

Tradeoff:
- Slightly less control over individual components  

---

### 2. Structured Output Reliability

Problem:  
LLMs do not always return clean JSON  

Solution:
- Strict JSON instruction in prompt  
- Backend parsing with fallback handling  
- Error display when parsing fails  

---

### 3. Evidence Linking

Approach:
- Extract direct quotes from transcript  
- Tag each quote (positive, negative, neutral)  
- Display alongside score  

This helps users understand why a score was assigned  

---

### 4. Hallucination Control

Problem:  
Model may generate quotes not present in transcript  

Solution:
- Prompt constraint: use only exact transcript text  
- Backend filtering of invalid quotes  

---

### 5. Gap Detection

Challenge:  
Identifying what is not mentioned in the transcript  

Approach:
- Prompt includes rubric dimensions  
- Model compares transcript coverage vs rubric  
- Outputs missing areas  

---

## Performance

- Model: Llama 3.2 (local)  
- Response time: 10–30 seconds  
- Depends on system RAM and CPU  

Advantages:
- No API cost  
- No internet dependency  
- Full data privacy  

---

## Optimizations

- Reduced prompt verbosity  
- Limited output token size  
- Single model call per request  

---

## Known Limitations

- JSON output may occasionally break  
- Gap detection is not always precise  
- No edit interface for users yet  
- Performance depends on hardware  

---

## Future Improvements

- Editable UI for reviewing AI output  
- Confidence score for predictions  
- Multi-step prompting for better accuracy  
- Evidence-to-score linking visualization  
- Side-by-side transcript and analysis view  
- Streaming responses  

---

## Product Thinking

This tool is designed to:
- Reduce manual analysis time  
- Improve consistency in evaluation  
- Assist non-technical users  
- Provide structured, reviewable insights  

The system prioritizes usability over complexity and focuses on delivering a reliable MVP.

---

---

## Author

Lal Bahadur Sahani  
Software Developer Internship Assignment  
DeepThought