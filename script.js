// 1. Select all sections and navigation menu items
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav ul li');

// 2. Add an event listener for scrolling
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // 3. Logic to check which section is currently in view
        // "- 200" is a buffer so the highlight changes slightly before the section hits the very top
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // 4. Loop through nav items to add/remove the "active" class
    navLi.forEach(li => {
        // Remove 'active' class from all items first
        li.classList.remove('active');
        
        // Check if the <a> tag inside the <li> matches the current section ID
        if (li.querySelector('a').getAttribute('href').includes(current)) {
            // Add 'active' class to the matching item
            if(current !== "") {
                li.classList.add('active');
            }
        }
    });
});