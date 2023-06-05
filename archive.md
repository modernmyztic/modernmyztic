---
layout: page
title: Blog Archive
description: Archive of old blog posts
permalink: /blog/archive/
---

{% for post in site.posts %}
{% assign readtime = post.content | strip_html | number_of_words | append: '.0' | divided_by:180 %}
{% assign modifiedtime = post.modified | date: "%Y%m%d" %}
{% assign posttime = post.date | date: "%Y%m%d" %}
<body class="" itemscope itemtype="http://schema.org/WebPage">
<div class="row">
<article class="post post col-md-12">
<header class="post-header">
{% if post.featured %}
<div class="cursive">this post is featured</div>
{% endif %}

{% if post.link %}
<h2 class="post-title text-center super lighter">
<a href="{{ site.url }}{{ post.url }}" style="color: #fff; background-color: #45ADA8; border-radius: 4px; padding: 10px">
<i class="fa fa-link"></i> {{ post.title }}
</a>
{% else %}
<h2 class="post-title text-center super lighter bordered-bottom">
<a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a> 
{% endif %}
</h2>

<div class="post-info text-center small">
<time datetime="{{ post.date | date_to_xmlschema }}" class="post-time">{{ post.date | date: "%d %b %Y" }}</time>
in <span class="post-tags">
{% for tag in post.categories %}
<a href="{{ site.url }}/categories/index.html#{{ post.categories | cgi_encode }}" data-toggle="tooltip" title="Other posts from the {{ tag | capitalize }} category" rel="tag">
{{ tag | capitalize }}
</a>
{% unless forloop.last %}
&nbsp;&bull;&nbsp;
{% endunless %}
{% endfor %}
</span>
</div>
</header>
<div class="post-body bordered-bottom">
{% assign excerptsize = post.excerpt | number_of_words %} 
{{ post.excerpt }}
<!-- {% if excerptsize <= 100 and excerptsize >= 50 %}
<p class="lead">{{ post.excerpt | strip_html }}&hellip;</p>
{% else %}
<p>{{ post.content | strip_html | truncatewords:100 }}&hellip;</p>
{% endif %} -->
<div class="text-center">
{% if post.description %}
<a href="{{ site.url }}{{ post.url }}" data-toggle="tooltip" title="{{ post.description }}" class="more-link btn btn-danger btn-large">
<i class="fa fa-link"></i> read more...
</a>
{% else %}
<a href="{{ site.url }}{{ post.url }}" data-toggle="tooltip" title="Read more about {{ post.title }}" class="more-link btn btn-danger btn-large">
<i class="fa fa-link"></i> read more...
</a>
{% endif %}
</div>
</div>
</article>
</div>
{% endfor %}

