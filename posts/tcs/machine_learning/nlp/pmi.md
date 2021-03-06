---
title: PMI and feature vectors
published: 2016-07-29
modified: 2016-07-29
tags: nlp, word embeddings
showTOC: True
---

* [ALLMR16 Randwalk](randwalk.html)
* [ALLMR16 Polysemy](polysemy.html)

Reduce the dimensionality of words by finding a low-dimensional vector for each word, such that the inner products approximate the log of the co-occurrence matrix (perhaps in a weighted sense).

Why does this work? I.e., why are the low-dimensional vectors useful for NLP tasks? One "task" is analogies. Word embeddings are useful for analogies if addition naturally corresponds to composing their meanings.

What could be a low-dimensional representation of a word? Its PMI with all possible contexts. (Firth: a word's sense is captured by the distribution of other words around it.) Assume all these PMI vectors live in a low-dimensional space; why does the log of co-occurrence find these vectors?

Here's a simplified model. Consider words drawn as follows: pick a random context vector, and then take words $w, w'$ with probability $\rc{Z^2} e^{-\an{v_w,c} - \an{v_w',c}}$. Integrating this gives $\rc{Z^2} \exp\pf{|v_w+v_w'|^2}{2}$. Then (I'm not being careful with the factor of $d$)
$$PMI(w,w') = \lg \fc{\Pj(w,w')}{\Pj(w)\Pj(w')} \approx \rc d \an{v_w,v_w'}+o(1).$$

If the context vector drifts slowly enough, this analysis still works.

(?) The right optimization problem is
$$\min\sum_{w_1,w_2} \Pj(w_1,w_2) (PMI(w_1,w_2)-\an{v_{w_1},v_{w_2}}.$$

Actually, better is
$$
\min_{\{v_w\}, C} \sum_{w,w'} X_{w,w'}(\ln (X_{w,w'}) - \ve{v_w+v_{w'}}_2^2-C)^2.
$$
