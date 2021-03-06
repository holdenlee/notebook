---
title: Alexa
published: 2016-10-13
modified: 2016-02-20
tags: nlp, dialogue
type: research
showTOC: True
---

[References](https://docs.google.com/document/d/1OtvefjviKSSWH2gzOtYo8T_DVEwPEsI2n0kdrC8WlZI/edit)

# Brainstorm 2/20/17

Questions:

1. What are the kinds of utterances that people give when talking about a topic? How can we represent their meaning? What is a rough classification or grammar?
2. Simulate conversations about a popular topic. 
3. What makes a conversation interesting?

Resources:

1. Semantic parsing. Data gathering pipeline.
2. What are other groups doing?
3. List of conversation topics. See pixie-other/

## Blogs, writeups, code

* [WildML chatbot](http://www.wildml.com/2016/04/deep-learning-for-chatbots-part-1-introduction/)
* [Attention and memory](http://www.wildml.com/2016/01/attention-and-memory-in-deep-learning-and-nlp/)

# OLD


* Dialogue
	* [LMRG16] Deep reinforcement learning for dialogue generation [paper](https://arxiv.org/pdf/1606.01541.pdf)
	* [DGZB16] EVALUATING PREREQUISITE QUALITIES FOR LEARNING END-TO-END DIALOG SYSTEMS [paper](https://arxiv.org/pdf/1511.06931v6.pdf)
	* [VL15] A Neural Conversational Model [paper](https://arxiv.org/pdf/1506.05869.pdf)
* Neural nets
	* [SSWF15] End-To-End Memory Networks
	    * Architecture
		    * Input $x_i$
			* Convert input into memory $m_i = A x_i$, $A\in \R^{d\times V}$
			* Output vecor $c_i = C x_i$.
			* Query $q$
			* Embedded query $u=Bq$.
			* Match between queries and memory $p_i = \text{softmax}(u^Tm_i)$.
			* Response is weighted sum $o = \sum_i p_ic_i$.
			* Predicted answer $\wh a = \text{softmax}(W(o+u))$.
		* For multiple layers, $u^{k+1}=u^k + o^k$. Each layer has $A^k,C^k$ to embed inputs. 
			* Two types of weight tying
				* output = input above, $A^{k+1}=C^k$.
				* RNN: $A^k =A, C^k=C$, and modify $u^{k+1} = H u^k + o^k$.


* OpenSubtitles
	* [Main page](http://www.opensubtitles.org/en/search)
	* [?](https://datahub.io/dataset/opus/resource/e5a441a7-73d5-4f8c-a4b5-4bab42a739f2)

## Questions

How does the beam search actually work? Do we just have $\Pj(w_1)\Pj(w_2|w_1)\Pj(w_3|w_2,w_1)$ or is there some more complicated energy-based model? (Don't normalize?)

How to promote consistency in answers? Hidden state.
