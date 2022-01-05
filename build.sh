
cargo build --target wasm32-unknown-unknown --package hackthon_platform --release && \
ic-cdk-optimizer ./target/wasm32-unknown-unknown/release/hackthon_platform.wasm -o ./target/wasm32-unknown-unknown/release/hackthon_platform-opt.wasm