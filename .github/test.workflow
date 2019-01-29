workflow "New workflow" {
  on = "push"
  resolves = ["Create an issue"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@test-github-actions"
  args = "branch test-github-actions"
}

action "Create an issue" {
  uses = "JasonEtco/create-an-issue@master"
  needs = ["Filters for GitHub Actions"]
  args = ".github/test-issue-template.md"
  secrets = ["GITHUB_TOKEN"]
}
