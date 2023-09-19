# Git的详细使用笔记

[TOC]

## git的常用命令

##### --设置用户签名和邮箱(一般是首次安装后使用)

**git config --global user.name**:一般只会使用一次，设置用户名称

**git config --global user.email**:设置git邮箱

##### --初始化本地库

**git init**:一般是用来在本地已经写完了的项目中，但是没有上传到git上的项目，执行git init后，可以让git

进行接管。

##### --git本地库状态

**git status:**查看当前本地库的状态，包括在什么分支上，已经提交了什么内容,未被追踪的文件之类的。

##### --查看项目版本历史

**git reflog**:查看版本的简略历史信息。

**git log**:查看版本的详细历史信息。

##### --版本穿梭/版本回退

**git reset --hard 版本号**：将当前工作区的版本退回到指定版本，一般是在本地时进行回退，在已经push的项目不建议如此做。



## git的版本控制分支常用命令



##### --查看当前分支

**git branch -v:**查看当前分支

##### --创建新分支

**git branch [新分支名称]:**创建新分支

##### -- 切换分支

**gir checkout [分支名称]**:切换分支

##### --新建并切换分支

**git checkout -b [新分支名称]**:新建并切换分支

##### --合并分支

如果想要将a分支合并到b分支上，例如，如果是想要将dev分支合并到master分支上，则：

首先需要将当前分支切换到master分支上：**git checkout master**

然后再执行合并命令：**git merge dev**

合并分支会自动commit。



## git远程操作常用命令

##### --给远程仓库起别名

**git remote -v:**查看当前远程库的别名

**git remote add [别名] [远程库地址]:** 这样就给远程库起了别名了。

##### --将本地项目推送到远程仓库

此处的推送适合于你在本地新建了项目，然后进行了开发，想将其推送到远程仓库进行接管。在进行推送前，需要做如下几项前提操作：

首先，需要在远程仓库github/gitee等新建一个仓库，并复制其仓库地址。

然后，需要在本地仓库中执行git init进行git初始化接管。

接下来就是推送到远程仓库命令：

**git push [远程仓库地址或别名] [本地分支名称]**:将本地仓库的该分支推送到远程仓库。







## git创建项目最好的办法

创建项目最好的办法就是先在远程托管平台中新建一个仓库，然后将该仓库clone下来到一个文件夹中，然后将你写好的项目复制到该clone文件夹中，这样就可以很大程度避免git未追踪问题。



## git常见问题



	##### -git的未追踪问题

> **第一种情况**：一种情况就是你在本地新建了分支，但是远端没有该分支，你需要将其推送上去。

**常见报错：The current branch master has no upstream branch.**

**git提示推荐解决方法：** **git push --set-upstream origin [新建分支名称]**

**如何解决？**

**git push --set-upstream origin [新建分支名称]**



> 插一嘴：如果你新建的分支dev,想要从master作为分支起点，则需要这样做：
>
> git checkout -b dev
>
> git pull :提示错误信息
>
> git pull origin master
>
> git push :提示错误信息
>
> git push --set-upstream origin



> **第二种情况**：远程已经有了该分支，但是你在切换分支时手滑写成了git branch [分支名],这个时候需要解决追踪问题。
>
> **或者可以这样说**：远程仓库新建了一个分支，你在开发的时候没有及时pull代码，然后你也新建了一个分支，该分支与远程分支重名，此时就需要进行追踪。
>
> //**便捷解决方法：将新建分支删除 git branch -d [分支名] 然后git pull ,然后 git checkout [分支名]**

**常见报错：The current branch master has no upstream branch.**

**git提示推荐解决方法：** git branch --set-upstream-to=origin/<branch> [分支名]

**如何解决？**

**git branch --set-upstream-to=origin/`remote_name` `local_name`**

其中 `remote_name` ： 远程分支名 // 这里是你创建的分支需要和已有的那个分支进行关联的名称
	`local_name` ： 本地分支 // 你当前创建的本地分支名称



## git注释

在你commit并push代码书写你对提交内容的描述的时候，也就是在书写commit message的时候，需要按照以下规则填写:

**commit message格式**

```text
<type>(<scope>):[空格]<subject>
```

**type(必须)**

用于说明git commit的类别，只允许使用下面的标识。

feat：新功能（feature）。**常用**

fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。**常用**

- fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
- to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix

docs：只添加了文档（documentation）。

style：只修改了格式（不影响代码运行的变动）。

refactor：重构（即不是新增功能，也不是修改bug的代码变动）。

perf：优化相关，比如提升性能、体验。

test：增加测试。

chore：构建过程或辅助工具的变动。

revert：回滚到上一个版本。

merge：代码合并。

sync：同步主线或分支的Bug。

**scope(可选)**

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在Angular，可以是location，browser，compile，compile，rootScope， ngHref，ngClick，ngView等。如果你的修改影响了不止一个scope，你可以使用*代替。













## 附

### git托管平台添加sshkey的方法

https://blog.csdn.net/weixin_42310154/article/details/118340458

#### **第一步：检查本地主机是否已经存在ssh key**

```js
cd ~/.ssh
ls
//看是否存在 id_rsa 和 id_rsa.pub文件，如果存在，说明已经有SSH Key
```

如果存在，直接跳到第三步

#### **第二步：生成ssh key**

如果不存在ssh key，使用如下命令生成

```js
ssh-keygen -t rsa -C "xxx@xxx.com"
//执行后一直回车即可
```

生成完以后再用第二步命令，查看ssh key

#### **第三步：获取ssh key公钥内容（id_rsa.pub）**

```js
cd ~/.ssh
cat id_rsa.pub
```

复制该内容

#### **第四步：Github账号上添加公钥**

#### **第五步：验证是否设置成功**

```js
ssh -T git@github.com
```











