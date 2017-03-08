---
title: Conversation with Paul Christiano
published: 2017-02-28
modified: 2017-02-28
tags: ai safety, machine learning
type: conversation
showTOC: True
---

See [alignment](alignment_ml.html) and [Concrete](concrete.html)

1. Overseeing RL systems
    * What to do when verification is hard, ex. plagiarism?
		* Ex. Have an adversarial system which gives you information that would help you discriminate. How do you make sure the optimization is on the same footing?
		* Concrete problem: GAN where discriminator recognizes and penalizes perfect memorization. 
			* Step 1. Give discriminator access to images. Ex. train the discriminator with an attention model over the images.
			* Step 2. Give discriminator access to generator's insides. If the generator has a pointer to the image, the generator discovers that.
	* Suppose an AI comes up with a plan to execute in the real world. You lack physical control. How do you make sure the AI doesn't trick you?
2. Semi-supervised learning
	* Find algorithms that work in this setting.
	* What is the sample complexity? Info-theoretic vs. for efficient algorithms?
	* Learning human values
3. Learning by imitation
    * Inverse reinforcement learning
	* ELBA: 
		* How can level $n$-agents meditate a dispute among $n+1$-level agents, possibly given more time? ($n+1$-level agents have to "make their case")
		* Even if $n+1$-level agents are opaque. (ML method. The logic method is to bake safety into it.)
		* Presupposes diversity
