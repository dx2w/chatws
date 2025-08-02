/*let currentUrl = window.location.href;

if (currentUrl.length > 100) {
    currentUrl = currentUrl.slice(0, 97) + '...';
    document.getElementById("urlRequest").innerHTML = currentUrl + `)`;
} else {
    document.getElementById("urlRequest").innerHTML = currentUrl + `)`;
}

const genderValue1 = "female";
const genderValue2 = "male";

let imageUrl = "https://placeholdmon.vercel.app/?name=*";

const genderAtt = Math.random() < 0.5 ? genderValue1 : genderValue2;
imageUrl += `&gender=${genderAtt}`;

const includeShiny = Math.random() < 0.5;
if (includeShiny) {
    imageUrl += "&shiny";
}

document.getElementById("img").src = imageUrl;

console.log("Generated Image SRC:", imageUrl);*/
let currentUrl = window.location.href

if (currentUrl.length > 100) {
  currentUrl = currentUrl.slice(0, 97) + `...`
  document.getElementById(`urlRequest`).innerHTML = currentUrl + `)`
} else {
  document.getElementById(`urlRequest`).innerHTML = currentUrl + `)`
}

const genderValue1 = `female`
const genderValue2 = `male`

fetch(`/list`)
  .then(response => response.text())
  .then(data => {
    // Filter out any HTML tags or non-Pokemon name lines
    const lines = data.split(/\r?\n/)
      .filter(line => line.trim() && !line.includes('<') && !line.includes('>'))
      .filter(Boolean)

    if (lines.length === 0) {
      console.error('No valid Pokemon names found in list')
      return
    }

    const randomName = lines[Math.floor(Math.random() * lines.length)].trim()
    const capitalizedName = randomName.charAt(0).toUpperCase() + randomName.slice(1).toLowerCase()

    let imageUrl = `https://placeholdmon.vercel.app/?name=${randomName}`

    const genderAtt = Math.random() < 0.5 ? genderValue1 : genderValue2
    imageUrl += `&gender=${genderAtt}`

    const isShiny = Math.random() < 0.5
    if (isShiny) {
      imageUrl += `&shiny`
    }

    document.getElementById(`img`).src = imageUrl

    // Create overlay text
    let overlayText = `A `
    if (isShiny) {
      overlayText += `shiny, `
    }
    overlayText += `${genderAtt} ${capitalizedName}`

    document.getElementById(`overlay-text`).textContent = overlayText
    console.log(`Generated Image SRC:`, imageUrl)
    console.log(`Pokemon name used:`, randomName)
  })
  .catch(error => console.error(error))