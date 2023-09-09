
class Result<T>{
  data?: T;
  code: number;
  msg: string;

  constructor(data: T, code: number, msg: string) {
    this.data = data
    this.code = code
    this.msg = msg
  }
}

function ok<T>(data?: T): Result<T> {
  return { data: data, code: 0, msg: "" }
}

function err<T>(code: number, msg: string): Result<T> {
  return { code: code, msg: msg }
}

class Fighter {
  id: string;
  name: string;
  skill: string[];
  created_at: Date;
  updated_at?: Date;

  constructor(
    { id = crypto.randomUUID(), name, skill, created_at = new Date(), updated_at }:
      { id?: string, name: string, skill: string[], created_at?: Date, updated_at?: Date }
  ) {
    this.id = id
    this.name = name
    this.skill = skill
    this.created_at = created_at
    this.updated_at = updated_at
  }
}

var fighters = [
  new Fighter({ name: "隆", skill: ["波动拳"] }),
  new Fighter({ name: "肯", skill: ["升龙拳"] }),
]


type StartupInfo = {
  pid: number;
  port: number;
  bun_version: string;
}

const startup_info: StartupInfo = { pid: process.pid, port: 3000, bun_version: Bun.version }
console.log(`Startup info: ${JSON.stringify(startup_info)}`)

Bun.serve({
  port: 3000,
  fetch() {
    return new Response(
      JSON.stringify(ok(fighters)),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  },
});

