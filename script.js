async function rankResume() {
  const resume = document.getElementById("resumeText").value;
  const jd = document.getElementById("jdText").value;
  const resultDiv = document.getElementById("result");
  const loader = document.getElementById("loader");

  if (!resume || !jd) {
    alert("Please paste both resume and job description.");
    return;
  }

  resultDiv.style.display = "none";
  loader.style.display = "block";

  const prompt = `
You are a professional HR AI. Compare this RESUME with the JOB DESCRIPTION and return:
1. Match score out of 100
2. Missing skills
3. 2-line summary of fit
4. Suggestions to improve the resume

RESUME:
${resume}

JOB DESCRIPTION:
${jd}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Something went wrong.";
    resultDiv.innerText = content;
    resultDiv.style.display = "block";
  } catch (error) {
    resultDiv.innerText = "Error: " + error.message;
    resultDiv.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
}

function copyResult() {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

function toggleTheme() {
  const body = document.body;
  const current = body.getAttribute("data-theme");
  body.setAttribute("data-theme", current === "dark" ? "light" : "dark");
}
