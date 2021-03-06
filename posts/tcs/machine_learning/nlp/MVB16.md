---
title: (MVB16) Geometry of Polysemy
published: 2016-10-28
modified: 2016-10-28
tags: nlp, word vectors, polysemy
type: summary
showTOC: True
---

# Abstract

Title: Geometry of Polysemy

[Link](https://arxiv.org/pdf/1610.07569v1.pdf)

Abstract: Vector representations of words have heralded a transformational approach to classical problems in NLP; the most popular example is word2vec. However, a single vector does not suffice to model the polysemous nature of many (frequent) words, i.e., words with multiple meanings. In this paper, we propose a three-fold approach for unsupervised polysemy modeling: (a) context representations, (b) sense induction and disambiguation and (c) lexeme (as a word and sense pair) representations. A key feature of our work is the finding that a sentence containing a target word is well represented by a low rank subspace, instead of a point in a vector space. We then show that the subspaces associated with a particular sense of the target word tend to intersect over a line (one-dimensional subspace), which we use to disambiguate senses using a clustering algorithm that harnesses the Grassmannian geometry of the representations. The disambiguation algorithm, which we call $K$-Grassmeans  leads to a procedure to label the different senses of the target word in the corpus -- yielding lexeme vector representations, all in an unsupervised manner starting from a large (Wikipedia) corpus in English. Apart from several prototypical target (word,sense) examples and a host of empirical studies to intuit and justify the various geometric representations, we validate our algorithms on standard sense induction and disambiguation datasets and present new state-of-the-art results.

# Comments 

Authors say: Our algorithm ($K$-Grassmeans) does slightly, but uniformly, better than the precision-recall that you report. But the surprising thing is that a simple baseline we setup using standard word2vec individual vectors also gets very close to the performance of your algorithm! We hypothesize why this could be so in Section 5 where we see that the all the algorithm outputs are highly correlated. They get the easy instance all correct and the ones that they make errors on are actually hard/subtle (or rare in the context of the corpus we use (which is Wikipedia)). 

# Summary

(by Yingyu)

## 1 Algorithm

Their algorithm is quite interesting, building on two key ideas: 1) the context of a word can be represented by a subspace 2) the context subspace of the same sense of a word will intersect. 

The algorithm is:

1. for each occurrence of a target word, take say a context window of size 10 around the occurrence. The subspace of the word vectors in the window is the subspace for this context. They take rank-3 PCA. I think this is related to what we did in the linear structure paper.
2. take all the context subspaces of a target polysemous word, cluster them into K groups. The clustering objective is called K-Grassman. It is similar to k-means, except that the center is a direction and the distance is the distance between a direction and a subspace. (This is word sense induction)
3. given a new context of the target word, one can build the context subspace, find the closest center obtained in the K-Grassman. (This is word sense disambiguation)

Finally, they also talked about lexeme representation. I understand this as given a polysemous word, how to represent its meanings. It's tempting to represent it as the K cluster centers obtained in the K-Grassman. However, they found that these directions tend to be close; the inner product tends to be as large as 0.9. They leave how to explain this as an open problem, then provide another way to do the lexeme representation: first use the above word sense disambiguation algo to label the words in the corpus, and then train a vector for each sense of each word.

**My thoughts**: I think the inner products between these cluster centers are large because of a simple reason: frequent words like "the" pop up in all context, so all context subspace has these components. This problem has been observed in multiple scenarios. For obtaining vectors for sentences, we can avoid this by doing a weighted average of the word vectors. So one way to handle this problem for subspace is: when computing the subspace for a sentence/context, find a subspace minimizing the weighted sum of the distances from the word vectors to the subspace. This should be better than PCA, which is minimizing the unweighted sum.

Their idea also implies a way to do sentence embedding: instead of using vectors, use subspace. 

## 2 Experiments

They tested on word similarity task dataset and our police lineup dataset.

On the police lineup, their result is better than ours. But theirs, ours, and simply using word2vec vectors, all lead to quite similar performance. (I observed this for our vectors before.) They mentioned that all methods are OK on easy ones but fail on hard ones in the testset. This is probably because some senses are rare on wiki data. 

## Further thoughts

Since we view a sentence as a subspace, then it makes sense to generalize our random walk model so that the discourse is now a subspace.
