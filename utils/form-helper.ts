const URL = "https://docs.google.com/spreadsheets/d/1KX58zuD7wSxZkbls3-D1rf5I9idUGqIo_vtPDF-8Ayg/gviz/tq?tqx=out:csv&sheet=Sheet1"
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdhb_TiG3LyzmXwNMhe_x6-iRQa1rJZzMWRLvUNiapS4u9Xzg/formResponse"

export async function checkGroup(): Promise<boolean> {
    try { 
        const response = await fetch(URL);
        const data = await response.text();
        const rows = data.split("\n");
        const count = rows.length - 1; 
        return count % 2 === 0;
    } catch (error) {
        console.error("Error assigning group!");
        return true;
    }
}

export async function submitResult(answers: Record<string, [string, string | number]>): Promise<boolean> {
    const data = new FormData()
  
    for (const questionId in answers) {
      const [entry, value] = answers[questionId]
      if(entry) data.append(entry, String(value))
    }
  
    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      })
      console.log("Data submitted successfully")
      return true
    } catch (error) {
      console.error("Error submitting data:", error)
      return false
    }
  }
  