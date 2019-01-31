workflow "New workflow" {
  on = "push"
  resolves = ["Comment on New Issue"]
}

action "Comment on New Issue" {
  uses = "waffleio/gh-actions/action-commitissuecommenter@master"
  secrets = ["GITHUB_TOKEN"]
  args = "Thanks for creating an issue!"
}

workflow "Test New Issue on push" {
  on = "push"
  resolves = ["Create an issue"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "branch test-github-actions"
  secrets = ["GITHUB_TOKEN"]
}

action "Create an issue" {
  uses = "JasonEtco/create-an-issue@11c8e67a9a77b755021d8349484be7dd2c3092ce"
  needs = ["Filters for GitHub Actions"]
  args = ".github/test-issue-template.md"
  secrets = ["GITHUB_TOKEN"]
}
