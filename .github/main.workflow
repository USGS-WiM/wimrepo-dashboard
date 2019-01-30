workflow "New workflow" {
  on = "push"
  resolves = ["Create an issue"]
}

action "Create an issue" {
  uses = "JasonEtco/create-an-issue@master"
  secrets = ["GITHUB_TOKEN"]
}