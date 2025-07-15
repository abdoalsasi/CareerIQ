document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    let dropdownOpen = false;

    if (dropdown && dropdownContent) {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownOpen = !dropdownOpen;
            if (dropdownOpen) {
                dropdownContent.style.display = 'block';
            } else {
                dropdownContent.style.display = 'none';
            }
        });

        document.addEventListener('click', function(e) {
            if (dropdownOpen && !dropdown.contains(e.target)) {
                dropdownContent.style.display = 'none';
                dropdownOpen = false;
            }
        });
    }
});
