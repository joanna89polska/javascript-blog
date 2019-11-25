document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });

  const titleClickHandler = function(event){
    
    event.preventDefault();
    
    const clickedElement = this;
    
    activeLink.classList.add('active');

    console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  /* [IN PROGRESS] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.titles a.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = document.querySelectorAll('href');

  clickedElement.getAttribute('href')

  console.log('articleSelector', clickedElement);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector('href');

  console.log('targetArticle',clickedElement);

  /* add class 'active' to the correct article */
  }
  
  targetArticle.classList.add('active');

  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }