---
title: Semantic shared response
published: 2016-09-24
modified: 2016-09-24
tags: neuroscience
type: talk
---

fMRI: $10^5$ $(3mm)^3$ voxels, measuring blood flow.

# Prior work

* Mitchell 08: pictures of concrete nouns
* Naselaris 09: images of scenes
* Pereira 11: generating words
* N11: reconstruct movie images
* Wehbe 14: chapter of Harry Potter (cf. speed reading)
* Huth 16: auditory stories

# Goal

* Decode fMRI response semantics. Match fMRI responses to annotations
    * Sherlock scenes annotated. 2000 scenes.
* Leverage multiple subject views to extract better semantics. (16 subjects)

# Methods

*   Pick a few brain regions to focus on. Ex. default node network (2006): related to narrative.
    * Hypothesis: this region does the best.
	* $\approx 2000$ voxels for each mask. (Masks are a small part of $10^5$.)
*   Shared response model
	$$\amin_{W^TW = I;S} \sumo ik \ve{X_i-W_iS}_F.$$
	(Columns of $W$ orthogonal. voxels$\times$features ($2000 \times 20$)) <!-- features x times -->
	* Probabilistic model $s_t\sim N(0,\Si_s)$. $x_{it}|s_t\sim N(W_is_t+\mu_i, \rh_i^2I)$.
	
Distributional hypothesis of meaning: meaning comes from co-occurrence.

We have multiple words in each annotation. Approaches:

* Unweighted: Averaging 
* Weighted: By inverse of frequency

(Note: words have different meanings. Use DL to split up words into atoms. Ignores polysemy.) 

Let $A=$fMRI, $B=$text. We learn a linear map $\Om A\approx B$. We can vary the way we constrain the maps.

<!--OLS-->

1. $\Om$ orthogonal.
2. Ridge regression (penalizes by norm of columns).

1. 20 dimensional SRM vs. averaging
2. Weighted vs. unweighted
3. Procrustes vs. ridge
4. Temporal average subtraction vs. not.

Annotation vectors 1000-dimensional.

Is true chunk in top 5? (See table in paper.)

<!--
| Mask | Performance |
|---|---|
|DMN| -->

Average, else correlated

<!--
Cathy - Cog neuro, Ken Norman
Zach - Implementation, why does wordvec work?
Howard - combine word vecs to word sequence vectors.
Julie - translate scenes into numbers, word vectors.
Shefali

Learning relations from text.
-->

Model

1. Unweighted $\Pj(w|c) = \fc{\exp(v_w^T c)}{Z}$.
2. Weighted $\Pj(w|c) = \al p(w)  + (1-\al) \fc{\exp(v_w^T c)}{Z}$, $\al\in [0,1]$. (Ex. more accurate for common words.)
