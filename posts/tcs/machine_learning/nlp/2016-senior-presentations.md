---
title: NLP
published: 2016-05-14
modified: 2016-05-14
tags: nlp
type: notes
showTOC: True
---

NLP group meeting 5-14-16

# Personality through sentiment analysis (Sidharth)

* Big five personality
* Predicting personality from Twitter data, etc.

Longitudinal, with 5000 documents per person spanning years, with data from private correspondences (more unfiltered). Use [presidential letters](http://rotunda.upress.virginia.edu/founders) from Adams, Jefferson, and Washington.

<!-- I am so much more expressive and unreserved in the expression of my sentiments-->

##Harvard Inquirer

Use Harvard Inquirer Categories which puts words in categories (ex. "strong" contains audacity, battle, wealthy, charisma, clever, climax, further). These are hand-crafted categories. There are 200 categories; number of words vary. Words can appear in multiple categories.

Start with a specific event and analyze the way they respond. For example, use Washington's early campaigns from the French and Indian War. Find keywords and phrases relating specifically to the event. Use these keywords to find other letters in the same category.

Differentiate between attitude in these letters and overall attitude by the difference of means statistical test. There were differences in overstatement, negative, understtement, vice, and arousal (negative).

In the early French and Indian War, Washington had limited resources, Americans would desert, etc. 

##General event analysis

Use Lasswell categories for general event analysis:

* power gain, loss, conflict, cooperation
* respect gain or loss
* affection gain or loss
* wealth
* well-being loss

Use a Bayesian classifier for all letters. Put in the category that it correlates with the most, provided it's at least a certain threshold.

Washington and Adams react to power loss differently. For example, Washington was more active and passive, and both understated and overstated more.

Vice put together with self-pronouns means self-doubt.

The goal was to find an interesting way to measure the resilience of a president in the face of tough events. I found some metrics which yielded useful, informative results.

Another example: Adams was pessimistic and powerless about not being able to go home; Jefferson was closely involved with the education of his kids.

How to use this? Facebook posts, emails (Clinton, Enron, Wikileaks). Panama papers?

# Answering SAT reading comprehension questions with tensor decomposition and neural networks (Saahil Madge)

<!-- you spend your whole life stuck in the labyrinth-->

Goal: create a system for machine comprehension. Previous work focused on reading questions for young children (MCTest), with very low accuracy on "why" questions. Most of these are "bag of words" models.

But we want to capture semantic and structural information. We use SAT questions, which are longer and more complex, and answering requires understanding deeper information about the context. They use different words, "angry" vs. "incensed", etc.

## Tensor factorization (actually, matrix factorization, optimizing over 2 matrices)

We use a knowledge graph, consist of entities and relations $\an{e_1,r,e_2}$. Entities are nodes, and relations are directed edges. We can ask queries $\an{e_1,?,e_2},\an{e_1,r,?}$.

(Google's knowledge graph is FreeBase, 300GB. Nell at Carnegie Mellon is trained to extract triples from the Internet.)

* First, convert text to sets of triples on the knowledge graph. (Use the Stanford NLP toolkit.)
* Use word2vec to convert questions to queries on the graph.

We focus on Subject-Verb-Direct object (ex. dog likes sausage) or copular relations (subject and description, ex. dog is green).
<!-- -->

We used Stanford high-dependency parser. We can do pronoun-antecedent resolutions as well.

Represent the knowledge graph as a 3-D array where each $X_k$ is the adjacency matrix for relation type $k$. Approach: find rank $r$ approximation
$$X_k\approx AR_kA^T,$$
($n\times r, r\times r$, $n$ is the number of entities) for latent features. Use alternating least squares, semantically smoth embedding. Answer questions using factorization. (The slices are dependent because the $A$ is shared.)

Stories about a character make one of the slices dense; explanatory articles are a lot sparser. Most tensors are sparse.
<!-- slices are not symmetric. (one way) binary and sparse -->

(Each slice is factorized separately? Use [Rescal](http://www.mit.edu/~mnick/).)

<!-- entries.-->

## Memory networks

Use neural network to predict answers. Embed the tensor and vectorized query $q$ as inputs. Train the network to recognize what information is relevant, and output an answer choice.

## Results

Tensor model trains independently, while the NN needs to be trained on 2/3 of the questions. Tensor model is consistent but with low ceiling.

The tensor model completes a triple rather than just give an answer choice.

<!-- small data. transfer learning. replaceable characters-->
<!-- metamind. semantic vs. episodic. DMM. default neural network -->


# Automated WordNet construction using word embeddings (Misha)

Can we use a mathematical approach to constructing the WordNet graph?

Current automated methods include merging or extending. Use multi-language translations (French WordNet), scrape Wiktionary, or use rule-based/automatic methods.

1. Can we associate words with synsets (sets of synonyms)? Use translations. <!--meaning independent of word-->
2. Can we find relations between synsets or words? Not yet. (Only using translation.)
3. Can we link to synsets in the Princeton WordNet? Yes.

Use word embeddings. Optimize the squared norm objective
$$\min_{v\in \R^d, C\in \R} \sum_{(i,j)\in [V]^2} f(X_{ij}) (\ve{v_w+v_j}_2^2 + C-\log X_{ij})^2.$$
(Distributional assumption.) Word vectors have been used in solving analogies, named-entity recognition, and word similarity.

Use the discourse model: a corpus is generated by a random walk over the discourse space $\R^d$.
<!-- lower bound for d. Why can't you take d=1,2? -->

##Associate words with synsets

Arora et al. used a learned dictionary of atoms to find representation of the meanings of a word $w\in V$ with a dictionary $A\in \R^{K\times d}$ and sparsity constraint $s$:

1. Find $R_w\in \R^K$ minimizing $\ve{v_w-R_w^TA}_2$ such that $\ve{R_w}_0\le s$.
2. For each $i$ such that $R_{w,i}>0$ find a dense cluster $C\sub \R^d$ of word vectors close to $A_i\in \R^d$.
3. For each cluster $C$, the set of words $\set{w'}{v_{w'}\in C}$ represents one meaning of $w$.

##Infer word relations

Consider hypernyms.

* For supervised learning, use SVM or logistic regression classification on word pair features.
* For unsupervised learning, learn a mixture of 2 gaussians on feature vectors for the word pair, or prune with similarity thresholds or requiring shared atoms.

This fails on real datasets because of word-relation sparsity and similar relations problem (problems discerning hypernyms and cohypernyms).

There is a spatial distinction between hyponym-hypernym and random pairs, but not between hyponym-hypernym and co-hypernym (sharing the same hypernym) pairs.

##Translational synset matching

We can link to synsets in the Princeton WordNet.

Given $w$ in a foreign language to synsets in the Princeton WordNet,

1. find meanings of $w$ using polysemy.
2. find the synsets of all English translations of $w$.
3. Match each meaning to one of the synsets by a similarity measure between the words in the meaning and the foreign languge translation of the synset definition.

<!--Sometimes don't match to correct atom. -->

Ex. The word "container" doesn't exist in Dutch. (cf. Hofstadter, Surfaces and Essences.)
