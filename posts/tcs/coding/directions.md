---
title: LDC's - directions
published: 2016-05-01
modified: 2016-05-01
tags: LDC
type: research
showTOC: True
---

[Notes](https://www.sharelatex.com/project/57169ca0b1d6259757ce842d).

#Learning/reading

* Understand the inequalities from convex geometry.
* Approximating the norm with a polynomial.
* Understand the relationship with tensor eigenvectors.
* Metric geometry.

#Approaches

* Any lower bound for a *perfect* LCC.
* Some kind of SoS relaxation---understand ARV first.
* Zeev's conjecture on covering the image of a polynomial map of fixed degree with convex sets.
* Comparison to convex hull. See [LCC geometry](lcc_geometry.html).
	* The image of the decoding map $D:[-1,1]^n\to [0,1]^n$ contains many points that are far apart, corresponding to the codewords. This gives that the convex hull of the image has large volume or a large $\ep$-net.
	* The image is close to convex, so the image is also large. 
	* However, the Jacobian of the map is small, so the volume of the image is small, contradiction.
* Directly bound convex hull. Ex. for 2-query, upper bound uses matrix concentration. More general concentration? (Ex. for tensors)
* Use differential geometry. Some notion of curvature?
* Phrase in terms of eigenvectors (or almost-eigenvectors) for higher-order tensors.
* Vague
    * Reduce to a problem of geometry.
