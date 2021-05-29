const photographersList = document.querySelector('.photographers-list')

function getJson() {
    return fetch("src/json/data.json")
    .then(response => {
        if(!response.ok) {
            throw new Error("HTTP error" + response.status)
        }
        return response.json();
    })
    .then(json => {
        const data = json
        return data;
    })
    .catch(function () {
        this.dataError = true;
    })
}

async function createProfiles() {
    const json = await getJson()
    for (const photographer of json.photographers) {
        // Create photographer container
        const photographerEl = document.createElement('div')
        photographerEl.classList.add("photographer-container")
        
        // Create photographer thumbnail
        const photographerThumbnail = document.createElement('div')
        photographerThumbnail.classList.add('photographer-thumb')

        // Create photographer link
        const photographerLink = document.createElement('a')
        photographerLink.classList.add("photographer-thumb_link")
        photographerLink.href = `/photographer?${photographer.name}`

        // Add profile pic
        const photographerPicture = document.createElement('img')
        photographerPicture.classList.add("photographer-thumb_portrait")
        photographerPicture.src = `src/images/photographers/${photographer.name.replace(/\s+/g, '')}.jpg`
        photographerPicture.height = '500'
        photographerPicture.width = '500'
        photographerPicture.alt = photographer.name
        photographerLink.appendChild(photographerPicture)

        // Add name
        const photographerName = document.createElement("h2")
        photographerName.classList.add("photographer-thumb_name")
        photographerName.innerText = photographer.name

        photographerLink.appendChild(photographerName)
        photographerThumbnail.appendChild(photographerLink)

        // Add City
        const photographerCity = document.createElement("p")
        photographerCity.classList.add("photographer-thumb_city")
        photographerCity.innerText = photographer.city
        photographerThumbnail.appendChild(photographerCity)

        // Add Quote
        const photographerQuote = document.createElement("p")
        photographerQuote.classList.add("photographer-thumb_quote")
        photographerQuote.innerText = photographer.tagline
        photographerThumbnail.appendChild(photographerQuote)

        // Add Price
        const photographerPrice = document.createElement("p")
        photographerPrice.classList.add("photographer-thumb_price")
        photographerPrice.innerText = `${photographer.price}€/jour`
        photographerThumbnail.appendChild(photographerPrice)

        // Add Tags
        const photographerTagList = document.createElement("div")
        photographerTagList.classList.add("photographer-thumb_tags")
        for (const tag of photographer.tags) {
            const photographerTag = document.createElement("p")
            photographerTag.classList.add("tag")
            photographerTag.innerText = `#${tag}`
            photographerTagList.appendChild(photographerTag)
        }
        photographerThumbnail.appendChild(photographerTagList)
               
        photographerEl.appendChild(photographerThumbnail)
        // Add element to DOM
        photographersList.appendChild(photographerEl)
    }
}    


createProfiles()