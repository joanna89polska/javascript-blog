{

  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };

  /* Varaibles */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optAuthorsListSelector = '.list.authors a',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  /*END Varaibles */

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

    const activeArticles = document.querySelectorAll('.posts .active');

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

  };

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  /* How to build a function called generateTitleLinks */

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      console.log(article);

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      /* create HTML of the link */

      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

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

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999,
    };
    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);

    }

    return params;
  }

  function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    const classAndValueNumber = optCloudClassPrefix + classNumber;
    return classAndValueNumber;
  }

  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */

    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* generate HTML of the link */

        //const linkHTML = '<li><a href="#tag-' + tag + '"<span>' + tag + '</span></a></li> ';
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);

        /* add generated code to html variable */

        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */

        if (!allTags.hasOwnProperty(tag)) {

          /* [NEW] add generated code to allTags object */

          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */

      tagList.innerHTML = html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)

    //let allTagsHTML = '';
    const allTagsData = { tags: [] };

    /* [NEW] START LOOP: for each tag in allTags */
    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '<li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      //allTagsHTML += tagLinkHTML;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      /* [NEW] END LOOP: for each tag in allTags */
    }
    /* [NEW] add html from allTags to tagList */

    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href;

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for (let activeTag of activeTags) {

      /* remove class active */

      activeTag.classList.remove('active');

      /* END LOOP: for each active tag link */

    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');

    /* START LOOP: for each found tag link */

    for (let tagLink of tagLinks) {

      /* add class active */

      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */

    const tags = document.querySelectorAll(optArticleSelector + ' , ' + optArticleTagsSelector);

    /* START LOOP: for each link */

    for (let tag of tags) {

      /* add tagClickHandler as event listener for that link */

      tag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {

    /*[NEW] create a new variable allAuthors with an empty object */

    let allAuthors = {};

    /* find all articles before optAuthorsListSelector */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    const authorList = document.querySelector('.authors');

    /* START LOOP: for every author: */

    for (let article of articles) {

      /* find author wrapper */
      //const authorList = document.querySelector('.authors'); moved before the loop

      /* make html variable with empty string */
      //let html = ''; - line moved before loop

      /* get author from author-tags attribute */

      const articleAuthors = article.getAttribute('data-authors');

      /* generate HTML of the link */

      const linkHTMLData = { id: articleAuthor, title: articleAuthor };
      const LinkHTML = templates.authorLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + authorHTML;

      authorList.innerHTML = authorList.innerHTML + linkHTML;

      /* [NEW] check if this link is NOT alredy in allAuthors */

      if (!allAuthors.hasOwnProperty(articleAuthors)) {

        /* [NEW add generated code to allAuthors array] */
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML = html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of authors in right column */

    //const authorList = document.querySelector('.authors');

    /* [NEW] create variable for all links HTML code*/

    const allAuthorsData = { authors: [] };

    /* START LOOP: for each authors on allAuthors */

    for (let author of allAuthors) {

      /* generate HTML of the link */

      //allAuthorsHTML += '<li><a href="#author-' + author + '">' +  author + ' (' + allAuthors[author] + ')' + '</a></li>';

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });

      /* add generated code to html variable */
      //html = html + linkHTML;

      /* END LOOP: for each tag */
      /* insert HTML of all the links into the tags wrapper */
      // authorList.innerHTML = authorList.innerHTML + linkHTML;

      authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

      /* END LOOP: for every author: */
    }

  }

  generateAuthors();

  function authorClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const author = href;

    /* find all tag links with class active */

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active tag link */

    for (let activeAuthor of activeAuthors) {

      /* remove class active */

      activeAuthor.classList.remove('active');

      /* END LOOP: for each active tag link */

    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');

    /* START LOOP: for each found tag link */

    for (let authorLink of authorLinks) {

      /* add class active */

      authorLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + author + '"]');
  }

  function addClickListenersToAuthors() {

    /* find all links to authors */

    const authors = document.querySelectorAll(optArticleAuthorSelector);

    /* START LOOP: for each link */

    for (let author of authors) {

      /* add tagClickHandler as event listener for that link */

      author.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();

}