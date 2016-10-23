---
title: Learning structured, robust, and multimodal deep models
published: 2016-10-21
modified: 2016-10-21
tags: neural networks, deep learning, multimodal
type: talk
showTOC: True
---

# Abstract

Building intelligent systems that are capable of extracting meaningful representations from high-dimensional data lies at the core of solving many Artificial Intelligence tasks, including visual object recognition, information retrieval, speech perception, and language understanding. In this talk I will first introduce a broad class of deep learning models and show that they can learn useful hierarchical representations from large volumes of high-dimensional data with applications in information retrieval, object recognition, and speech perception. I will next introduce deep models that are capable of extracting a unified representation that fuses together multiple data modalities as well as present the Reverse Annealed Importance Sampling Estimator (RAISE) for evaluating these deep generative models. Finally, I will discuss models that can generate natural language descriptions (captions) of images, as well as generate images from captions using attention mechanism. I will show that on several tasks, including modelling images and text, these models significantly improve upon many of the existing techniques.

* Develop statistical models to mine for structure: Deep learning models support inferences and discover structure at multiple levels. <!-- drug rec-->
    * Ex. understanding images (Nearest neighbor sentence: people taking pictures of a crazy person)
	
# Learning deep generative models

* RBM: visible $v\in B^D$, hidden $h\in B^F$, bipartite connections. $\Pj(v,h) \propto \exp(v^TWh + a^Th + b^Tv)$.
	* Ex. alphabets
	* Derivative of LL. Partition function difficult to compute!
	* Can change to Gaussians (real-valued variables), etc.
	* Word counts (undirected version of topic models) (bag of words)
	* Easy to infer states of hidden variables $\Pj(h|v)$. 
	* "Product of experts": after marginalizing over hidden variables (Government, corruption, and oil give high probability of Putin). Better for info retrieval than traditional topic models.
* DBM
	* Compose representations.
	* MRF with hidden variables and specific structure
	* Hidden variables dependent even conditioned on input.
	* Both $\E$ now intractable
	* Use variational inference for $\E_{P_{data}}[vh^{1T}]$ and stochastic approximation (MCMC) for $\E_{P_\te}[vh^{1T}]$.
	* Handwritten data: real data more diverse, crisp.
	* Pattern completion (3-D object recognition) <!-- true bayesian hedges bets-->
	* Model A vs. B: Take training example at random and show, vs. RBM. Compute $P$ on validation set. Need estimate of $Z$. RBM better than mixture of Bernoullis by 50 nats.
	* Simple importance sampling. Given easy-to-sample-from and intractable target distribution, reweight and use MC approximation. Can't just draw from uniform distribution!
	* Annealed importance sampling, $p_0,\ldots, p_K$. Geometric average $p_\be(x) = f_\be/Z_\be = f_0^{1-\be}/f_{target}(x)^\be/Z_\be$. If initial is uniform, $p_\be = f_t^\be/Z_\be$, $\be$ inverse temperature. (Annealing by averaging moments)
		* AIS gives unbiased estimator of $Z_t$.
		* We are interested in estimating $\ln Z_t$. Jensen: $\E \ln Z_t\le \ln Z_t$. Underestimate! We get a stochastic lower bound.
		* Log-probability on test set, overestimate $\ln p = \ln f - \ln Z_t$. <!--If sloppy, model looks nice!-->
	* Gibbs sampling. Pretend it's equilibrium after 1000 steps.
		* Unrolled RBM as deep generative model. As approximation to RBM. 
		* $p_{fwd}(x_{0:K}) = p_0(x_0)\prodo kK T_k(x_k|x_{k-1})$.
		* Reverse AIS estimator (RAISE). Start at data and melt distribution. Tends to underestimate log-probs.
	* Learning hierarchical representations.
* Model evaluation: Good way of evaluating!

Learn feature representations!
<!--textons, audio features-->

# Multi-modal learning

* Image, text, audio. Joint representations?
* Product recommendations
* Robotic

* Challenges
	* Images are real-valued, text is sparse.
	* Noisy and missing data
* Multimodal DBM, go up and then down the other way. Define joint distribution over images and text.
* Given text, sample from images
	* MIR-Flickr dataset
* Solve supervised learning tasks. Can do better if use unlabeled data. Learn better features and representations. 
* Can pre-train image pathway and text pathways. <!-- Q: how much can you decouple? -->
* Complete descriptions of images.
	* Encoder: CNN to semantic feature space.
	* Decoder: neural language model.
	* Learn joint embedding space of images and text. Natural definition of scoring function.
	* Ex. Fluffy.
	* Multimodal linguistic regularities: Addition and subtraction. (Cat - bowl + box)
		* Bird and reflection: Two birds are trying to be seen in the water.
		* Giraffe is standing next to a fence in a field.
		* Handlebars are trying to ride a bike rack.
	* Caption generation with visual attention.
	* Generate images from captions. (school bus flying in blue skies)
	* Helmholtz machines/variational autoencoders. Directed counterparts. Generative process goes down. Approximate inference going up. Hinton95 (Science). Now it works, Kingma2014 (NIPS)
	    * A toilet seat sits open in the bathroom, grass field
		* Ask google. <!--worked on toilet project-->

# Open problems

* Unsupevised learning/transfer learning/one-shot learning
* Reasoning, attention, memory
* Natural language understanding
	* Sequence-to-sequence learning
	* Skip-thought model
		* Generate previous and forward sentence
		* Objective: sum of log-probabilities for previous/next sentence conditioned on current.
		* How similar are 2 sentence are on the scale 1 to 5. (A person is performing a trick on a motorcycle? A person is tricking a man on a motorcycle.)
		* We use no semantic features.
		<!-- AdaSent -->
* Deep reinforcement learning


Neural storytelling. Take corpus of books (romantic), generate captions about the image.

Kiros2015 NIPS

One-shot learning: humans vs. machines. How can we learn novel concept from few examples (Lake, S, Tenenbaum 2015, Science)

# Questions

CNN better for supervised. We're trying to build convolutional DBM.

vs. variational autoencoder. Reparametrization trick, backprop through whole model. Optimization better for VA. Both useful. 

Learning representation, not with language?

<!-- evaluation
neural image on google $10^5$
-->
Microsoft dataset: 80000 images, 5 captions each. 
Not big enough, but captions clean!

Topics vs. coherent model of sentences. What do we need? New architectures, training sets?
<!--need rep to corresp with reality. have memory, check for consistency with memory -->

<!--AlphaGo is more technological. Fast, evaluating -->

Actor-Mimic model.

Transfer learning: learn new games faster by leveraging knowledge about previous games. Ex. star gunner

Continuous state.
