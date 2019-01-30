workflow "Comment on New Issues" {
  resolves = ["AddComment"]
  on = "issues"
}

action "AddComment" {
  uses = "waffleio/gh-actions/action-newissuecomment@master"
  secrets = ["GITHUB_TOKEN"]
}
