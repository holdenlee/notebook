---
title: PMI for images
published: 2016-08-01
modified: 2016-08-01
tags: PMI, neural nets, vision
type: research
showTOC: True
---

#Notes

Experiments:

* `mnist_testing.m`: Prep data.
* `svd_testing.m`: How does reducing the number of features through SVD affect classification accuracy?
* `pairwise_mi.m`: Tests related to mutual information
* `mi.m`
* `MI_GG.m`
* `rsvd.m`



```
	         nlayers: 2
             layer: {2x1 cell}
    type_zerolayer: 2
             ndesc: 7200


                         numlayer: 1
                        centering: 0
    median_contrast_normalization: 0
                           npatch: 5
                      subsampling: 2
                             smap: 50
                   type_zerolayer: 2
                            sigma: 0.7459
                                Z: [25x50 double]
                                w: [50x1 double]
```

In `pairwise_mi.m` there's no normalization by scaling ($-2\log\pat{scale}$).

https://en.wikipedia.org/wiki/Conditional_mutual_information

#Theory

The right PMI measure to use here is
$$
\ln \pf{\an{v,w}}{\an{v,\one}\an{w,\one}}.
$$
Because if we assume the activations are like $(e^{\chi,v})_\chi$, then we still get that the expected dot product of these is $\int e^{\an{\chi,v}}e^{\an{\chi,w}}\,d\chi\propto \exp\pa{\fc{\ve{v+w}^2}{2}}$.

#Thoughts

* Is a picture more like a context or a document? We're treating it like context (looking at all pairs of features there). But its size makes it seem more like a document. Or better: a sentence, because sentences are big enough to incorporate different features and small enough to still have a vector associated with it.
* How to incorporate convolutional ideas? Ex. if features $f_1,f_2$ are in the same relationship (translationally) as $f_1',f_2'$ then we expect PMI to be similar, so we should we really be looking at a $7200\times 7200$ matrix? How about look at PMI of adjacent features? (But they shouldn't overlap...) Or look at PMI pre-convolution by another layer?
* What happens if you apply (convolutional?) DL to the learned features? Then apply SVD to the dimension-reduced vectors?

#Todo

##Coding

* Compute PMI matrix.
* Plot histogram of PMI's.
* Plot histogram of conditional PMI's.
* Train on feature vectors.
* Do weighted SVD on PMI matrix.
* Do dictionary learning on feature vectors/PMI vectors (?).

##Theory

Understand loss function for PMI.

#Scratch 

Qs

* Why is the normalization `nrm=mean(sqrt(sum(compTr.^2)))`?

