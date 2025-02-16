   // Select all news list items and featured area elements
   const newsItems = document.querySelectorAll('#news-list li');
   const featuredImage = document.getElementById('featured-image');
   const featuredInfo = document.getElementById('featured-info');
   const featuredTitle = featuredInfo.querySelector('.news-title');
   const featuredDetails = featuredInfo.querySelector('.news-details');

   // Update featured news when a news list item is clicked
   newsItems.forEach(item => {
     item.addEventListener('click', function() {
       const imageSrc = this.getAttribute('data-image');
       const title = this.getAttribute('data-title');
       const details = this.getAttribute('data-details');

       featuredImage.src = imageSrc;
       featuredTitle.textContent = title;
       featuredDetails.textContent = details;

       newsItems.forEach(i => i.classList.remove('active'));
       this.classList.add('active');
     });
   });

   // For touch devices: Toggle overlay expansion on click if screen width is small
   if (window.innerWidth <= 768) {
     document.querySelectorAll('.photo-container').forEach(container => {
       container.addEventListener('click', function(e) {
         // Prevent conflict if clicking on a news list item
         if(e.target.closest('#news-list')) return;
         let overlay = container.querySelector('.news-info');
         overlay.classList.toggle('expanded');
       });
     });
   }