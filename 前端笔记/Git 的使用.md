# Git 的使用



1. ` git pull origin next:master`:要取回origin主机的next分支，与本地的master分支合并，需要写成这样。
2. `git pull origin next`:如果远程分支(next)要与当前分支合并，则冒号后面的部分可以省略。
3. 在某些场合，Git会自动在本地分支与远程分支之间，建立一种追踪关系(tracking)。比如，在git clone的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说，本地的master分支自动”追踪”origin/master分支。如果当前分支与远程分支存在追踪关系，git pull就可以省略远程分支名`$ git pull origin`。如果当前分支只有一个追踪分支，连远程主机名都可以省略。` git pull`



```js
# 分支合并发布流程：
git add .			# 将所有新增、修改或删除的文件添加到暂存区
git commit -m "版本发布" # 将暂存区的文件发版
git status 			# 查看是否还有文件没有发布上去
git checkout test	# 切换到要合并的分支
git pull			# 在test 分支上拉取最新代码，避免冲突
git merge dev   	# 在test 分支上合并 dev 分支上的代码
git push			# 上传test分支代码
```





