---
title: LCC lower bounds by geometry
published: 2016-04-02
modified: 2016-04-02
tags: none
type: summary
showTOC: True
---

#General plan

See [LDCs](ldc.html) for basics.

Suppose the LCC is large.

* The image of the decoding map $D:[-1,1]^n\to [0,1]^n$ contains many points that are far apart, corresponding to the codewords. This gives that the convex hull of the image has large volume or a large $\ep$-net.
* The image is close to convex, so the image is also large. 
* However, the Jacobian of the map is small, so the volume of the image is small, contradiction.

#Convex hull of image is large

?

Intuitively this can work: consider a simplexification; if each simplex is large the volume grows rapidly in terms of the number of vertices.

#Image close to convex

The idea is from [Bar13](Bar13.html).

We modify it to give a bound on $L^2$ distance instead of KL-divergence, and to look at the image of the unit ball instead. (Normalize the domain by $\rc{\sqrt{n}}$.) The image is of size on the order $\sqrt{n}$, and we get $\ep\sqrt{n}$ approximations.

*Problem*: Is this enough?

* This compares the volume of the convex hull to the volume of the $\ep$-expanded set, which may be much larger than the volume of the set.
* To show it's not much larger, it seems necessary to show the surface area is small, and inductively the surface area in each dimension is small.
* If we use "$\ep$-net size" instead of volume, we don't have this problem---but then we have to bound the size of an $\ep$-net of the convex hull in the first step.

#Volume of image small

For $q=2$, get $\pf{C}{\sqrt n}^n$.

For $q>2$, use the matrix Efron-Stein inequality.

We might want to look at surface areas, etc. I think 1-dimensional length between code-words gives a ECC condition.
