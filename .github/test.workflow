workflow "New workflow" {
  on = "push"
  resolves = ["Create an issue"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "branch test-github-actions"
}

action "Create an issue" {
  uses = "JasonEtco/create-an-issue@test-github-actions"
  needs = ["Filters for GitHub Actions"]
  args = ".github/test-issue-template.md"
}
