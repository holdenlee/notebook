---
title: (PMDH16) Convolutional Patch Representations for Image Retrieval - an Unsupervised Approach
published: 2016-09-26
modified: 2016-09-26
tags: neural net, vision
type: paper
showTOC: True
---

We write things in the continuous limit. In actuality we have to discretize.

Define the kernel $K:(\Om \to \R)\times (\Om\to \R) \to \R$ by
\begin{align}
K(M,M') = \sum_{z,z'\in \Om} e^{-\rc{2\be^2}\ve{z-z'}^2} \ka (P_z, P_{z'}')\\
\ka(P_z,P_{z'}') & = \ve{P_z}\ve{P_{z'}'} e^{-\rc{2\al^2} \ve{\wt P_z - \wt P_{z'}}^2}
\end{align}
where $P_z =M_{z+[0,e)\times [0,e)\times [0,d)}$.

Background: see [kernels](../kernels.html).
