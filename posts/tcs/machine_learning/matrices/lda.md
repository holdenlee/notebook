---
title: LDA (Linear discriminant analysis)
published: 2016-09-04
modified: 2016-09-04
tags: LDA, dimensionality reduction
type: concept
showTOC: True
---

\begin{align}
\Ga_c &= \rc{|S_c|} \sum_{i\in S_c} \ol X_i\\
\Si_c &= \rc{|S_c|} \sum_{i\in S_c} (\ol X_i - \Ga_c)(\ol X_i - \Ga_c)^T\\
\Phi &= \rc{C} \sumo cC  (\Ga_c-\Ga) (\Ga_c-\Ga)^T\\
\max_{V\in \R^{k\times L}, V^TV=I_L} \fc{\Tr(V^T\Phi V)}{\Tr(V^T \sumo cC \si_c v)}
&= L_1\text{ principal eigenvectors of }(\wt \Phi = \pa{\sumo cC \Si_c}^+ \Phi).
\end{align}
