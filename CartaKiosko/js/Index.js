document.addEventListener("DOMContentLoaded", () => {
    axios.get('https://www.numier.com/kiosco/api/business?name=sevillafcespt00101')
        .then(response => {
            const data = response.data.data;

            // Insertar logo, fondo y nombre del establecimiento
            document.getElementById("logo").src = data.logo;
            document.getElementById("nameShow").textContent = data.nameShow;
            document.getElementById("description").textContent = data.description || "Sin descripción.";
            document.getElementById("background-image").src = data.imageBackground;

            // Insertar dirección y teléfono
            document.getElementById("address").textContent = data.address;
            document.getElementById("phone").textContent = data.phone || "No disponible";

            // Idiomas disponibles
            const languages = data.lang.map(lang => lang.langName).join(", ");
            document.getElementById("languages").textContent = languages;

            // Horarios de apertura (si hay texto de horarios)
            document.getElementById("horariosText").textContent = data.horariosText || "No disponible.";

            // Información fiscal
            document.getElementById("fiscalName").textContent = data.fiscalData.fiscalName;
            document.getElementById("companyAddress").textContent = data.fiscalData.companyAddress;
            document.getElementById("companyCity").textContent = data.fiscalData.companyCity;
            document.getElementById("companyCountry").textContent = data.fiscalData.companyCountry;
            document.getElementById("companyPostalCode").textContent = data.fiscalData.companyPostalCode;
            document.getElementById("companyCifNif").textContent = data.fiscalData.companyCifNif;
            document.getElementById("companyPhone").textContent = data.fiscalData.companyPhone;
        })
        .catch(error => {
            console.error("Error al obtener los datos", error);
        });
});
