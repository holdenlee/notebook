---
title: Confidence in neural nets
published: 2017-04-03
modified: 2017-04-03
tags: neural net
type: summary
showTOC: True
---

Related: [adversarial examples](adversarial.html).

From AAML: RBF/conservative classifier for in vs. out-of-distribution examples. [AAML workshop notes](/posts/cs/ai/control/aaml_workshop.html)

Q: how go get a neural net to keep a confidence bound?

# [HG17] Baseline for detecting misclassified and out-of-distribution examples

High-confidence predictions frequently produced by softmaxes. Ex. random Gaussian noise gives 90+% confidence. (Q: what if you do before softmaxes?)

Prediction probability of incorrect/ood examples are lower.

Give tasks to evaluate.

2 problems

1. error and success prediction: Can we predict whether a classifier will make an error on a held-out test example? (Use this to output $\perp$.) Tradeoff between false negatives and positives.
2. In/out-of-distribution detection: Predict whether test example is from different distribution.

ROC (receiver operating characteristic) shows
$$
\pa{tpr = \fc{tp}{tp+fn}, fpr = \fc{fp}{fp+tn}}.
$$
PR (precision-recall) shows
$$
\pa{\text{precision} = \fc{tp}{tp+fp}, \text{recall} = \fc{tp}{tp+fn}}.
$$

* AUROC is prob that a positive example has greater score than negative example. Not great when different base rates.
* AUPR (precision-recall)

## Abnormality detection with auxiliary decoders

* Train normal classifier and append auxiliary decoder which reconstructs input. (Blue layers)
* Train jointly on in-distribution examples. Freeze blue layers. Train red layers (on top) with clean and noised training examples. (Noised are abnormal.)

Improves detection.

## Discussion

* Baseline beaten by exploiting representations.
* Intra-class variance: if distance from example to another is abnormally high, may be out of distribution.
* known-unknown vs. unknown-unknown.

# [HG17] EARLY METHODS FOR DETECTING ADVERSARIAL IMAGES

Adversarial images place abnormal emphasis on lower-ranked principal components from PCA.

(Q: can you do this even independent of PCA - just by looking at e.g. wavelet/Fourier coefficients? Also, what if you adversarially keep PCA components low, incorporate weighted norm into adversarial optimization?)

Use variance of PCA coefficients of whitened images to detect. (What is whitening again?)
