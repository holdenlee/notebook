---
title: LSTM Programming
published: 2016-03-19
modified: 2016-03-19
tags: programming
type: programming
---

#Math

Here are the equations for LSTM.

\begin{align}
f_t&=\si(W_f \coltwo{h_{t-1}}{x_t} + b_f)\\
i_t&=\si(W_i \coltwo{h_{t-1}}{x_t} + b_i)\\
\wt{C}_t &= \tanh (W_C\coltwo{h_{t-1}}{x_t}+b_C)\\
C_t &= f_t \odot C_{t-1} + i_t \odot \wt{C}_t\\
o_t &= \si(W_o\coltwo{h_{t-1}}{x_t} + b_o)\\
h_t &= o_t\odot \tanh(C_t)\\
\wh y &= \text{softmax}(Wh_t + b).
\end{align}

References:

* http://colah.github.io/posts/2015-08-Understanding-LSTMs/
* http://colah.github.io/posts/2015-09-NN-Types-FP/

#LSTM layer

We define functions

*   `step_lstm` :: $\R^n\times \R^m\times \R^m \to \R^m\times \R^m$ sending
    $$(i_t, C_{t-1}, h_{t-1}) \mapsto (C_t, h_t).$$
*   `sequence_lstm` :: $(\R^n)^s \times \R^m\times \R^m \to (\R^m)^s$ sending
	$$((i_t)_{t=1}^T, C_0, h_0)\mapsto (h_t)_{t=1}^T.$$
	(This is essentially "scanl" of step_lstm.)
* `step_multiple_lstm` :: $(\R^n)^k\times (\R^m)^k \times (\R^m)^k \to (\R^m)^k \times (\R^m)^k$. The mapped vrsion of step_lstm. This we can implement efficiently as a matrix multiplication.
* `sequence_multiple_lstm` :: $((\R^n)^s)^k\times (\R^m)^k \times (\R^m)^k \to (\R^m)^k \times (\R^m)^k \to ((\R^m)^s)^k$. There are two ways to write this:
    * As the mapped version of `sequence_lstm` (i.e., scan, then map).
	* As the scanned version of `step_multiple` (i.e., map, then scan). This is more efficient since we can implement the "map" as a matrix multiplication.

(Actually these functions will involve the parameters as well, which we omitted here.)

##Implementation

Define `step_lstm1` by

```python
def step_lstm1(x, C, h, Wf, bf, Wi, bi, WC, bC, Wo, bo):
    hx = T.concatenate([h,x]) #dimension m+n
    f = sigmoid(T.dot(hx, Wf) + bf) #dimension m
    i = sigmoid(T.dot(hx, Wi) + bi) #dimension m
    C_add = T.tanh(T.dot(hx, WC) + bC) #dimension m
    C1 = f * C + i * C_add #dimension m
    o = sigmoid(T.dot(hx, Wo) + bo) #dimension m
    h1 = o * T.tanh(C1) #dimension m
    return [C1, h1] #dimension 2m
```

Now define `step_lstm` as the version with parameters grouped together.

```py
def step_lstm(x, C, h, tparams): 
    Wf, bf, Wi, bi, WC, bC, Wo, bo = unpack_params(tparams, ["Wf", "bf", "Wi", "bi", "WC", "bC", "Wo", "bo"])
    return step_lstm1(x, C, h, Wf, bf, Wi, bi, WC, bC, Wo, bo)
```

To define `sequence_lstm` we use Theano's can function. The arguments are

* `fn` is the function
* `outputs_info` are the initial values in the recursion
* `non_sequences` are fixed values that are not involved in the recursion.

Thus to create a scanned function like so

```haskell 
scan' :: ((a,b,c) -> b) -> [a] -> b -> c -> [b]
scan' f a's init fixed =
```

we call

```py
theano.scan(fn=f, sequences=a's, outputs_info=init, non_sequences=fixed)
```

Note here a, b, c can encompass multiple arguments, in which case you pass a list to `sequences`, `outputs_info`, and `non_sequences`. However, a, b, c must appear in that order.

```py
def sequence_lstm(C0, h0, xs, tparams):.
    Wf, bf, Wi, bi, WC, bC, Wo, bo = unpack_params(tparams, ["Wf", "bf", "Wi", "bi", "WC", "bC", "Wo", "bo"])
    #the function fn should have arguments in the following order:
    #sequences, outputs_info (accumulators), non_sequences
    #(x, C, h, Wf, bf, Wi, bi, WC, bC, Wo, bo)
    ([C_vals, h_vals], updates) = theano.scan(fn=step_lstm1,
                                          sequences = xs, 
                                          outputs_info=[C0, h0], #initial values of the memory/accumulator
                                          non_sequences=[Wf, bf, Wi, bi, WC, bC, Wo, bo], #fixed parameters
                                          strict=True)
    return [C_vals, h_vals]
```

Note this will map automatically; to define `sequence_multiple_lstm` all we have to do is swap two axes.

(Note on Theano list in scan.)

#Neural net functions

A vanilla neural net layer is

```py 
def nn_layer1(x, W, b):
    return x * W + b

def nn_layer(x, tparams):
    W, b = unpack_params(tparams, ["W", "b"])
    return nn_layer1(x, W, b)
```

We define functions

* `nn_layer` :: $\R^n\times \R^n$
*   `logloss` :: $\R^n\times \R^n$ given by
    $$\text{logloss}(x,y) = -\sum_i x_i \ln' (y_i)$$
	where we use `corrected_log`, $\ln'(y) = \ln(\max(10^{-6}, x))$ to avoid blowup at small probabilities.

Now we can combine these with our LSTM to make the evaluation, prediction, and loss function. Evaluation will give the probabilities of each output, prediction will give the output with max probability, and loss is the logloss on the expected and actual outcomes. We also include a accuracy function that outputs 1 if the prediction is correct and 0 otherwise.

Note `fns_lstm` returns a list of Theano variables (depending on the input lists/parameters) representing the activations, predictions, losses and accuracy. We haven't compiled these variables into a function yet.

<!--
We include a flag saying if we just want the output for the last in the sequence, or every time step. We also want versions that are mapped over sequences (to do them in batch).
-->

(Add code here)

Some other functions:

* `init_params_with_f_lstm(n,m,f,g)`
* `train_lstm`
* `weight_decay` :: $\R$ -> Dict String TheanoVars -> [String] -> $\R$. For the parameters in the list, sum the squares of their norms and multiply by the decay constant.

(A further speedup is to concatenate the matrices.)

#Data processing functions

We'll keep parameters in a dictionary, and unpack them as needed.

```python
def unpack_params(tparams, li):
    return [tparams[name] for name in li]
```

* `wrap_theano_dict` and `unwrap_theano_dict`.
* `get_minibatches_idx` (::Int -> Int -> Bool -> [(Int, [Int])]) will give an enumerated list of minibatch indices, given `n`, the size of the list, and `minibatch_size`. It will make a minibatch out of the remainder.
* `oneHot(choices, n)` gives a way to encode one-hot vectors within Theano.

#Optimization functions

These are taken from...

The arguments of each are

*   lr: learning rate
*   tparams: dictionary of parameters (not Theano variables)
*   grads: gradient of function to optimize
*   cost:
*   args: args to cost function (e.g., neural net inputs)

Returns

*   `f_grad_shared`
*   `f_update`

What does the train function need?

* Epochs: An epoch is going through all the data once. Stop after `patience` number of epochs have passed without progress, or after `max_epochs`.
* Optimizer
    * Cost function to optimize
		* Arguments to cost function
* Batch:
    * batch size during training
	* batch size for validation
* Initial parameters
* Frequency (after how many updates do you...) 
    * validate?
	* save data? (to where?)
* Data (train, validation, test): What's the difference between validation and test?
* Batch-maker: Given the data, make a list of batches. One epoch consists of going through all the batches.

Pseudocode for `train`:

* Take the union of the parameters.
* Compile the cost and gradient functions.
* Get the `f_grad_shared` and `f_update` functions from the optimizer.
* Make batches from the validation data.
* In an epoch:
    * Make batches from the training data.
	* For each batch:
		* Increment number of updates by 1.
		* Calculate the cost of the batch.
		* Make an update based on the batch.
		* Display (epoch/update number and cost on current batch) and save if necessary.
		* If it's time to validate (every validFreq times), calculate the training error (over the WHOLE batch) and validation error (over the entire validation dataset). (NOTE: Do we want to calculate the training error over the whole batch? Perhaps just sample from it.)
		* If the validation error is the best so far, replace `best_p`.
		* If it has been `patience` iterations since validation error improved, stop.
* Calculate the training and validation error one final time.

<!-- Scraps
while I wait for someone to write a frontend in haskell...
-->
