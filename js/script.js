/* eslint-disable no-undef */
{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };

  /* Varaibles */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleSingleTagSelector = '.post-tags a',
    optArticleAuthorSelector = '.post-author',
    optArticleSingleAuthorSelector = '.post-author a',
    optAuthorListSelector = '.list.authors',
    optAuthorListElem = '.list.authors li a',
    optTagsListSelector = '.list.tags a',
    optCloudClassPrefix = 'tag-size-',
    optCloudClassCount = 7;

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');

  };

  /* How to build a function called generateTitleLinks */

  function generateTitleLinks(customSelector = '') {

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
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
      min: 99999,
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

  /* How to build a function for generating Tags */

  function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      const tagList = article.querySelector(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray) {
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);
        html = html + linkHTML + ' ';

        // eslint-disable-next-line no-prototype-builtins
        if (!allTags.hasOwnProperty(tag)) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagList.innerHTML = html;
    }

    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = { tags: [] };

    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
  generateTags();

  const tagClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');

    for (let tagLink of tagLinks) {
      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll(optArticleSingleTagSelector + ',' + optTagsListSelector);
    for (let tag of tagLinks) {
      tag.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();

  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    const allAuthorsData = { authors: [] };
    const authorSidebar = document.querySelector(optAuthorListSelector);

    for (let article of articles) {
      //let author = article.getAttribute('data-author');
      const authorList = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');

      // eslint-disable-next-line no-prototype-builtins
      if (!allAuthors.hasOwnProperty(articleAuthor)){
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      const linkHTMLData = { id: articleAuthor, title: articleAuthor };
      const authorLinkHTML = templates.authorLink(linkHTMLData);
      html = html + authorLinkHTML;
      authorList.innerHTML = html;
    }

    for (let author in allAuthors){
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
    }
    authorSidebar.innerHTML = templates.authorCloudLink(allAuthorsData);
  }
  generateAuthors();

  const authorClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    
    clickedElement.classList.add('active');
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
      const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');

      for (let authorLink of authorLinks) {
        authorLink.classList.add('active');
      }
      generateTitleLinks('[data-tags~="' + author + '"]');
    }
  };

  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optArticleSingleAuthorSelector + ',' + optAuthorListElem);
    console.log('all links found ', authorLinks);
    for (let author of authorLinks) {
      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();

}