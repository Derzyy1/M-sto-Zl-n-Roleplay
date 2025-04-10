// Function to calculate and display the time since September 18, 2021
function updateSinceDate() {
    const startDate = new Date('2021-09-18');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    document.getElementById('dynamic-date').textContent = `${years}Y/${months}M/${days}D`;
}

// Call the function to update the date dynamically
updateSinceDate();

// Update the date every day
setInterval(updateSinceDate, 24 * 60 * 60 * 1000);

// Debugging function to log API responses and errors
async function updateProfileImages() {
    const teamMembers = [
        { id: 2374508308, elementId: 'Derzyy' },
        { id: 1234567890, elementId: 'profesional_MIKI' },
        { id: 3456789012, elementId: 'PanSmoky' },
        { id: 4567890123, elementId: 'DonSalat' },
        { id: 5678901234, elementId: 'w3xoq' }
    ];

    for (const member of teamMembers) {
        try {
            console.log(`Fetching profile image for user ID: ${member.id}`);
            const response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${member.id}&size=150x150&format=Png&isCircular=false`);
            const data = await response.json();

            console.log(`API response for user ID ${member.id}:`, data);

            if (data && data.data && data.data.length > 0) {
                const imageUrl = data.data[0].imageUrl;
                const imgElement = document.querySelector(`#${member.elementId} .avatar`);
                if (imgElement) {
                    imgElement.src = imageUrl;
                    console.log(`Updated image for ${member.elementId} to ${imageUrl}`);
                } else {
                    console.warn(`Image element not found for ${member.elementId}`);
                }
            } else {
                console.warn(`No image data found for user ID ${member.id}`);
            }
        } catch (error) {
            console.error(`Failed to fetch profile image for user ID ${member.id}:`, error);
        }
    }
}

// Call the function to update profile images
updateProfileImages();