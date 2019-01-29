workflow "Test workflow" {
  on = "push"
  resolves = ["Create an issue"]
}

action "Test-Github-Actions" {
  uses = "actions/bin/filter@test-github-actions"
  args = "branch test-github-actions"
}

action "Create an issue" {
  uses = "JasonEtco/create-an-issue@master"
  secrets = ["GITHUB_TOKEN"]
}
