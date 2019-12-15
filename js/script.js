{

  document.getElementById('test-button').addEventListener('click', function () {
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });

  const titleClickHandler = function (event) {

    event.preventDefault();

    const clickedElement = this;

    console.log(clickedElement);

    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const href = clickedElement.getAttribute('href');

    console.log('articleSelector', href);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(href);

    console.log('targetArticle', targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  /* How to build a function called generateTitleLinks */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {

      console.log(article);


      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log(linkHTML);

      /* insert link into titleList */

      html = html + linkHTML;

    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }
  generateTitleLinks();

}