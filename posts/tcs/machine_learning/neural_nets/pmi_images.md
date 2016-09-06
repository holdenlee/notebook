---
title: PMI for images
published: 2016-08-01
modified: 2016-09-05
tags: PMI, neural nets, vision
type: research
showTOC: True
---

# Results

## PMI distribution

**Note: I think this subsection is not quite right because it doesn't agree with the other data below. Todo: run again.**

Over all pairs of features $i,j$, this is the distribution of $PMI(v_i,v_j)$:

<img src="/images/pmi/pmi_histogram_1.jpg">

(Question: is this what you would expect if the distribution were "random" or are the tails different than what we would expect?)

Is there a correlation between PMI and distance between features? (Distance ranges from $0$ to $5\sqrt 2$.) It seems not.

<img src="/images/pmi/pmi_distance.jpg">

Conditioned on the digit being a specific value, how does the PMI distribution look? Still about the same... except that 1 has much larger activation. These are digits 0-4.

<img src="/images/pmi/hist_P_1_0.jpg">
<img src="/images/pmi/hist_P_1_1.jpg">
<img src="/images/pmi/hist_P_1_2.jpg">
<img src="/images/pmi/hist_P_1_3.jpg">
<img src="/images/pmi/hist_P_1_4.jpg">

## Thresholded PMI distribution

See script `pmi_thresholded.m`.

Remove all features that do not have PMI $>1$ with another feature. Now do the same thing.

This is the distribution of $PMI(v_i,v_j)$:

<img src="/images/pmi/hist_thres05_1.jpg" width="500">

These are digits 0-4.

<img src="/images/pmi/hist_thres05_1_0.jpg" width="500">
<img src="/images/pmi/hist_thres05_1_1.jpg" width="500">
<img src="/images/pmi/hist_thres05_1_2.jpg" width="500">
<img src="/images/pmi/hist_thres05_1_3.jpg" width="500">
<img src="/images/pmi/hist_thres05_1_4.jpg" width="500">

Percentiles of the distributions ($i$th row is 0, 10, 20, ... 100% for the CPMI's of digit $i$, last row is PMI over all digits).

```
  Columns 1 through 7

   -0.9746   -0.0588   -0.0140    0.0112    0.0306    0.0488    0.0681
   -3.1365   -0.3102   -0.0940    0.0050    0.0609    0.1144    0.1812
   -0.9300   -0.0626   -0.0130    0.0134    0.0333    0.0526    0.0740
   -0.7660   -0.0462   -0.0022    0.0210    0.0403    0.0602    0.0835
   -2.0740   -0.0565   -0.0071    0.0188    0.0397    0.0611    0.0855
   -0.8674   -0.0628   -0.0077    0.0229    0.0471    0.0705    0.0966
   -2.3770   -0.0457   -0.0007    0.0228    0.0428    0.0639    0.0886
   -2.4824   -0.0928   -0.0235    0.0121    0.0379    0.0633    0.0925
   -0.9435   -0.0521   -0.0066    0.0161    0.0347    0.0545    0.0785
   -2.1549   -0.0505   -0.0020    0.0231    0.0446    0.0679    0.0961
   -0.8693   -0.0515    0.0008    0.0344    0.0640    0.0949    0.1309

  Columns 8 through 11

    0.0910    0.1215    0.1730    1.5181
    0.2772    0.4314    0.7470    5.3609
    0.1007    0.1393    0.2117    1.5297
    0.1141    0.1604    0.2521    1.6011
    0.1169    0.1635    0.2537    2.2486
    0.1293    0.1773    0.2773    2.0363
    0.1215    0.1727    0.2771    2.5443
    0.1305    0.1882    0.3019    2.9006
    0.1111    0.1639    0.2788    2.1102
    0.1344    0.1957    0.3210    2.7701
    0.1761    0.2406    0.3557    1.7908
	
```


## SVD-SVM

Run `qsub svd_svm.cmd` which runs `svd_testing2.m`, or `sbatch slurm_svd.cmd`. The results are saved in `accs_1.mat`.

Results:

| Dimension | Last | Best |
|---|---|---|
|500|99.26|99.44|
|100|97.5 |98.82|
|50|96.84|96.84|

## Weighted SVD-SVM

Do weighted SVD (as in the NLP paper) and then train a SVM. Note this does worse than just SVD! Why?

| Dimension | Last | Best |
|---|---|---|
|50|95.44|96.8|

## Unorganized

I sorted pairs of features by PMI value and took the largest 10000 pairs. The majority of the pairs (~77%) have strongest activation with the digit 1. (The digit 1 has conditional PMI values that are much larger than all the other digits - don't know what to do about this.) 85% of the pairs have highest activations with the same digit.

If the pair has strong activation with 1, then it's often much larger than the other activations. 

Otherwise this is not necessarily true. A typical non-1 feature has average activations with the 10 digits that looks something like this:

```
  Columns 1 through 7

    0.0708    0.2673    0.0940    0.1537    0.2122    0.1116    0.2627

  Columns 8 through 10

    0.2947    0.1448    0.3361

```

# Notes

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

# Theory

The right PMI measure to use here is
$$
\ln \pf{\an{v,w}}{\an{v,\one}\an{w,\one}}.
$$
Because if we assume the activations are like $(e^{\chi,v})_\chi$, then we still get that the expected dot product of these is $\int e^{\an{\chi,v}}e^{\an{\chi,w}}\,d\chi\propto \exp\pa{\fc{\ve{v+w}^2}{2}}$.

# Thoughts

* Is a picture more like a context or a document? We're treating it like context (looking at all pairs of features there). But its size makes it seem more like a document. Or better: a sentence, because sentences are big enough to incorporate different features and small enough to still have a vector associated with it.
* How to incorporate convolutional ideas? Ex. if features $f_1,f_2$ are in the same relationship (translationally) as $f_1',f_2'$ then we expect PMI to be similar, so we should we really be looking at a $7200\times 7200$ matrix? How about look at PMI of adjacent features? (But they shouldn't overlap...) Or look at PMI pre-convolution by another layer?
* What happens if you apply (convolutional?) DL to the learned features? Then apply SVD to the dimension-reduced vectors?

# Todo

## Coding

* Completed
  * Compute PMI matrix. 
  * Plot histogram of PMI's.
  * Plot histogram of conditional PMI's. (They don't look like they have higher values... Try thresholding first? Look at features with largest PMI? Calculate entropies?)
  * Look at correlations between PMI's and distances between pairs. (There doesn't seem to be any correlation.)
* Todo
  * Train on feature vectors.
  * Do weighted SVD on PMI matrix.
  * Do dictionary learning on feature vectors/PMI vectors (?).

(Compare to purely random.)

## Theory

Understand loss function for PMI.

# Scratch 

Qs

* Why is the normalization `nrm=mean(sqrt(sum(compTr.^2)))`?

# Steps, Experiments

Run experiments.

```
nohup nice -19 matlab -nodisplay -nodesktop -nojvm -nosplash < run_experiments2.m > output_2016-08-07.txt 2>&1 &
```

```matlab
%Get psiTr
pmi_experiments('logs/model_mnist_5_2_0_2_2_0_50_200_0_1.000000e-01_1.000000e-01_1.000000e-01_2.mat');
%get percentiles for each feature
pc= get_percentiles(psiTr);
save('pc_1.mat','pc','-v7.3');
%calculate PMI after normalizing and deleting zero rows.
[P, inds] = calculate_pmi(psiTr); %inds give the indices that are kept (indices of nonzero rows)
%exploratory analysis
%pmi_experiments(P);
[all_pmi_pairs, positions, dists] = pmi_experiments2(P, inds');
save('all_pmi_pairs_1.mat','all_pmi_pairs');
save('positions_1.mat','positions');
save('dists_1.mat','dists');

%cpmi matrices
Ps = calculate_cpmi(psiTr, Ytr, '1');
cpmi_experiments('P_1');
```




# Guide to data

* `psiTr_1.mat`, `psiTe_1.mat` etc. are the feature vectors for the training/test sets and the different architectures. The architectures are
    1. `test_ckn([5 2 0],[2 2 0],[50 200 0],2,'mnist');` (7200, 0.57%)
	2. `test_ckn([1 3 0],[2 2 0],[12 50 0],3,'mnist');` (1800, 0.63%)
	3. `test_ckn([1 3 0],[2 4 0],[12 400 0],3,'mnist');` (3600, 0.41%)
* 
