---
title: CART and random forests
published: 2016-06-29
modified: 2016-06-29
tags: CART, adaptive basis functions, random forests
type: notes
showTOC: True
---

See Ch. 16 of Murphy. [Presentation](http://math.bu.edu/people/mkon/MA751/L18RandomForests.pdf)

An adaptive basis-function model (ABM) is a model of the form
$$ f(x) = w_0+\sumo mM w_m \phi_m(x).$$
Typically $\phi_m(x) = \phi(x;v_m)$

#CART (Classification and regression trees)

Decision trees recursively partition the input space and define a local model on each region.

For example, if the model is constant on each region, $f(x) = \sumo mM w_m (x\in R_m)$.

At each node, consider these kinds of splits:

* Thresholds: $x_i<t$, $x_i\ge t$. (Quantitative feature)
* $x_i=c,x_i\ne c$ (Categorical feature)

The cost can be regression or classification cost. Sum the costs for each leaf. Cost:

* Regression: cost of fitting model on the leaf.
* Classification
  * Misclassification rate of leaf. (Use the most probable class label.)
  * Entropy: $-\sumo cC \wh\pi_c\lg \wh\pi_c$. (Recommended)
  * Gini index $\sumo cC \wh \pi_c(1-\wh \pi_c) = 1-\sumo cC \wh\pi_c^2$.

Algorithm:

1. Start at the root node of a single-node tree, and put all data points at that node.
2. Find the split at the current node (attribute) that minimizes the cost (maximizes information gain). (If it is deemed not worth splitting, e.g. it doesn't decrease the cost by much[^f1], if it's reached a specified depth, etc., then move on instead.) Make the split. (The data points are now distributed among the two children.)
3. Add both child nodes. to the queue.
4. Continue the algorithm (at 2) with the next node in the queue.

[^f1]: This is usually too myopic. Instead use pruning. Grow the full tree, evaluate the cross-validated error on subtrees, and pick a minimal tree whose CV error is within 1 se of the min.

Advantages:

* Easy to interpret
* Handle mixed inputs
* Insensitive to monotone transformations, robust to outliers.
* Automatic variable selection

Disadvantages:

* Features are very restricted.
* Unstable: small changes in input data can have large changes because of the hierarchical nature of the tree-growing process. (They are high variance estimators.)

#Random forests

**Bagging** (bootstrap aggregating): Train $M$ different trees on independently selected subsets of the data, and compute $f(x)=\sumo mM \rc M f_m(x)$.

(OR: use boosting instead of taking majority vote.)

BUT this can result in highly correlated predictors.

**Random forest**: Decorrelate base learners by learning rees based on a randomly chosen subset of input variables and data points.

(What are the right parameters? $\sqrt d$ features?)

**Bayesian adaptive regression trees (BART)**.

? Hierarchical mixtures of experts.



