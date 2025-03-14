function toggleSave(element) {
    if (element.classList.contains('saved')) {
        element.classList.remove('saved');
        element.classList.add('unsaved');
        element.classList.replace('fa-bookmark', 'fa-bookmark-o');
    } else {
        element.classList.remove('unsaved');
        element.classList.add('saved');
        element.classList.replace('fa-bookmark-o', 'fa-bookmark');
    }
}
