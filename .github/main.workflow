workflow "New workflow" {
  on = "push"
  resolves = ["Comment on New Issue"]
}

action "Comment on New Issue" {
  uses = "waffleio/gh-actions/action-commitissuecommenter@master"
  secrets = ["GITHUB_TOKEN"]
  args = "Thanks for creating an issue!"
}
