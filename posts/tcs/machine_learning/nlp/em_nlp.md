---
title: Embedding methods in NLP
published: 2016-12-16
modified: 2016-12-16
tags: nlp, word vectors
type: topic
showTOC: True
---

# EMNLP

[EMNLP 2014 tutorial](http://emnlp2014.org/tutorials.html#embedding)

## Methods

* Ranking/retrieval
	* LSI
	* SSI
* Language modeling
	* NNLM
	* Word2vec
	* GloVe
* Supervised prediction
	* RNN(LM)
	* Convolutional nets for tagging (SENNA)

## Details

* Bag of words (baseline)
* LSI $\phi(d) = Ud$ ($d$ document as sum of words)
* SSI Similarity of query $q$ to document $d$ given by $f(q,d) = q^TWd$, $W$ from data. 
	* $W$ is big.
	* Make $W$ low rank. $W=U^TV+I$.
	* Maximize AUC. Want $f(q,d^+)>f(q,d^-)$. (14) 
	* Ex. cross-language retrieval
	* Better: replace AUC with rank weighted loss
* $n$-gram (baseline)
* NNLM
	* Arrange in tree. Cluster dictionary according to semantics or frequency.
* Word2Vec
	* CBOW: predict current word from neighbors
	* Skip-gram: predict neighbors from current word
	* Compositionality (addition)
* NLP tasks: POS tagging, chunking (NP, VP), named entity recognition, semantic role labeling
* Hand-made features, SVM. ASSERT. Pipeline
	* POS tagger, parser
	* NER tagging
	* Put together for SRL labeler
* Deep learning way
	* Avoid parse tree
	* Avoid hand-built features
	* Joint train NLP tasks on common embedding
	* Window approach: feed fixed-size window around each word
	* Sentence: feed whole sentence, tag 1 word at a time, convolutions handle variable length inputs. Max pool over time
	* Deep SRL
		* Softmax: Train for word tag likelihood, or 
		* Sentence tag likelihood. Sentence score is sum of likelihoods for individual words and transition score
	* Bad for rare words
* ? semi-supervised (61)
* Recursive NN's
	* Socher ICML13, EMNLP13
	* Build sentence representations using parse tree $f(W[c_1;c_2]+b)$
* Paragraph vector predicts words in doc, $n$-grams in the doc.
* Words are combined with linear matrices dependendent on the P.O.S.: G. Dinu and M. Baroni. How to make words with vectors: Phrase generation in distributional semantics. ACL '14.
* Previous common belief in NLP: engineering syntactic features necessary for semantic tasks. One can do well by engineering a model/algorithm rather than features.

## Embeddings for multi-relational data

* Embeddings for multi-relational data
    * Relation (sub, rel, obj)
	* WordNet: dictionary where each entity is a sense (synset).
	* Freebase
	* KB's are hard to manipulate.
		* Large
		* Sparse
		* Noisy/incomplete
	* Solutions:
		* Encode into low-dimensional vector spaces
		* Use representations to complete/visualize, in applications
	* Link prediction
		*   RESCAL ($X_k$ are matrices)
		    $$
			\min_{A,R} \rc2 \pa{\sum_k \ve{X_k - AR_k A^T}_F^2} + \la_A \ve{A}_F^2 + \la_R \sum_k \ve{R_k}_F^2.
			$$
			* Downsides: many parameters, bad scalability, bad reconstruction criteria for binary data
		* Ideas
			* Low-dimensionsal continuous vector embedding trained on similarity
			* Stochastic training based on ranking loss
		* $d(sub, rel, obj) = -\ve{R^{left}s^T - R^{right} o^T}_1$. (Note: this is projection onto a common space, rather than something quadratic!)
		    * SGD with negative examples
			* Still have problems
		* Neural tensor networks
			* $d(sub, rel, obj) = u_r^T \tanh (h^TW_r t + V_r^1 h + V_3^2 t + b_r).$
			* $d^3$ parameters
		* Model relations as translations
			* $d = \ve{s+r-o}_2^2.
			* there may exist embedding spaces in which relationships among concepts are all decribed by translations
			* Much fewer parameters. Does better!
			* Refinements (108)
	* Embeddings for information extraction
		* Entity linking: Identify mentions
		* Relation extraction: extract facts
		* Word-sense disambiguation is key
		* Embedding-based classifier to predict relation (Weston13, 11) (predict based on other text besides subj, obj. Can combine with KB
		* Universal schemas (I don't get this.)
	* Question answering
		* Subgraph embeddings: learn embeddings of questions and candidate answers (Bordes14) (Q: How to embed subgraph???)
		* Convert Freebase to Q&A pairs.
		* Paraphrase questions
* Issues
	* Must train embeddings together 
	* Compression, blurring (How to one-shot learn new symbols?)
	* Sequential models suffer from long-term memory
	* Need many updates
	* Negative example sampling inefficient
	* How to use nonlinearity?

* Code
	* [Torch](www.torch.ch)
	* [SENNA](ronan.collobert.com/senna)
	* [RNNLM](www.fit.vutbr.cz/~imikolov/rnnlm)
	* [Word2vec](code.google.com/p/word2vec)
	* [Recursive NN](nlp.stanford.edu/sentiment)
	* [SME (multi-relational data)](github.com/glorotxa/sme)

# [SPWC] Recursive deep models for semantic compositionality over a sentiment treebank

Put triplet (subj, rel, obj) through tensor network to predict.
$$
g(e_1,R,e_2) = 
u_R^T f\pa{
e_1^T W_R^{[1:k]} e_2 + 
V_R\coltwo{e_1}{e_2} + b_R
}
$$

<!--
(Q: how about subj, obj -> rel, etc.? Joint probability distribution makes more sense? What is relationship between prob and NN models?)
-->

# [SCMN16] Reasoning With Neural Tensor Networks for Knowledge Base Completion

Recursive neural tensor model

Sentiment Treebank: sentiment labels for phrases in parse trees of sentences. [Website](http://nlp.stanford.edu/sentiment)

Captures effects of negation and its scope.

* RNN with a classifier at each node in the parse tree that predicts sentiment in one of 5 classes. ($W$ is the same matrix.) (Q: how do you make it a binary tree?)
* MV-RNN (matrix-vector): represent every word and longer phrase in parse tree as both vector and matrix (initialized as $I_d+$noise). Matrix of one multiplied by vector of other. (parameters is large and depends on vocab)
* RNTN allows quadratic interaction: $p = f\pa{(b\,c)V^{[1:d]}\coltwo bc + W \coltwo bc}$.

Train: Classification at each node. Minimize KL-divergence.
