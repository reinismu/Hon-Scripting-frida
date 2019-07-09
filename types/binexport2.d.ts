import * as $protobuf from "protobufjs";
/** Properties of a BinExport2. */
export interface IBinExport2 {

    /** BinExport2 metaInformation */
    metaInformation?: (BinExport2.IMeta|null);

    /** BinExport2 expression */
    expression?: (BinExport2.IExpression[]|null);

    /** BinExport2 operand */
    operand?: (BinExport2.IOperand[]|null);

    /** BinExport2 mnemonic */
    mnemonic?: (BinExport2.IMnemonic[]|null);

    /** BinExport2 instruction */
    instruction?: (BinExport2.IInstruction[]|null);

    /** BinExport2 basicBlock */
    basicBlock?: (BinExport2.IBasicBlock[]|null);

    /** BinExport2 flowGraph */
    flowGraph?: (BinExport2.IFlowGraph[]|null);

    /** BinExport2 callGraph */
    callGraph?: (BinExport2.ICallGraph|null);

    /** BinExport2 stringTable */
    stringTable?: (string[]|null);

    /** BinExport2 addressComment */
    addressComment?: (BinExport2.IReference[]|null);

    /** BinExport2 comment */
    comment?: (BinExport2.IComment[]|null);

    /** BinExport2 stringReference */
    stringReference?: (BinExport2.IReference[]|null);

    /** BinExport2 expressionSubstitution */
    expressionSubstitution?: (BinExport2.IReference[]|null);

    /** BinExport2 section */
    section?: (BinExport2.ISection[]|null);

    /** BinExport2 library */
    library?: (BinExport2.ILibrary[]|null);

    /** BinExport2 dataReference */
    dataReference?: (BinExport2.IDataReference[]|null);

    /** BinExport2 module */
    module?: (BinExport2.IModule[]|null);
}

/** Represents a BinExport2. */
export class BinExport2 implements IBinExport2 {

    /**
     * Constructs a new BinExport2.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBinExport2);

    /** BinExport2 metaInformation. */
    public metaInformation?: (BinExport2.IMeta|null);

    /** BinExport2 expression. */
    public expression: BinExport2.IExpression[];

    /** BinExport2 operand. */
    public operand: BinExport2.IOperand[];

    /** BinExport2 mnemonic. */
    public mnemonic: BinExport2.IMnemonic[];

    /** BinExport2 instruction. */
    public instruction: BinExport2.IInstruction[];

    /** BinExport2 basicBlock. */
    public basicBlock: BinExport2.IBasicBlock[];

    /** BinExport2 flowGraph. */
    public flowGraph: BinExport2.IFlowGraph[];

    /** BinExport2 callGraph. */
    public callGraph?: (BinExport2.ICallGraph|null);

    /** BinExport2 stringTable. */
    public stringTable: string[];

    /** BinExport2 addressComment. */
    public addressComment: BinExport2.IReference[];

    /** BinExport2 comment. */
    public comment: BinExport2.IComment[];

    /** BinExport2 stringReference. */
    public stringReference: BinExport2.IReference[];

    /** BinExport2 expressionSubstitution. */
    public expressionSubstitution: BinExport2.IReference[];

    /** BinExport2 section. */
    public section: BinExport2.ISection[];

    /** BinExport2 library. */
    public library: BinExport2.ILibrary[];

    /** BinExport2 dataReference. */
    public dataReference: BinExport2.IDataReference[];

    /** BinExport2 module. */
    public module: BinExport2.IModule[];

    /**
     * Creates a new BinExport2 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BinExport2 instance
     */
    public static create(properties?: IBinExport2): BinExport2;

    /**
     * Encodes the specified BinExport2 message. Does not implicitly {@link BinExport2.verify|verify} messages.
     * @param message BinExport2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBinExport2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BinExport2 message, length delimited. Does not implicitly {@link BinExport2.verify|verify} messages.
     * @param message BinExport2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBinExport2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BinExport2 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BinExport2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2;

    /**
     * Decodes a BinExport2 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BinExport2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2;

    /**
     * Verifies a BinExport2 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BinExport2 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BinExport2
     */
    public static fromObject(object: { [k: string]: any }): BinExport2;

    /**
     * Creates a plain object from a BinExport2 message. Also converts values to other types if specified.
     * @param message BinExport2
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: BinExport2, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BinExport2 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace BinExport2 {

    /** Properties of a Meta. */
    interface IMeta {

        /** Meta executableName */
        executableName?: (string|null);

        /** Meta executableId */
        executableId?: (string|null);

        /** Meta architectureName */
        architectureName?: (string|null);

        /** Meta timestamp */
        timestamp?: (number|Long|null);

        /** Meta paddingV1 */
        paddingV1?: (Uint8Array|null);
    }

    /** Represents a Meta. */
    class Meta implements IMeta {

        /**
         * Constructs a new Meta.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IMeta);

        /** Meta executableName. */
        public executableName: string;

        /** Meta executableId. */
        public executableId: string;

        /** Meta architectureName. */
        public architectureName: string;

        /** Meta timestamp. */
        public timestamp: (number|Long);

        /** Meta paddingV1. */
        public paddingV1: Uint8Array;

        /**
         * Creates a new Meta instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Meta instance
         */
        public static create(properties?: BinExport2.IMeta): BinExport2.Meta;

        /**
         * Encodes the specified Meta message. Does not implicitly {@link BinExport2.Meta.verify|verify} messages.
         * @param message Meta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IMeta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Meta message, length delimited. Does not implicitly {@link BinExport2.Meta.verify|verify} messages.
         * @param message Meta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IMeta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Meta message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Meta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Meta;

        /**
         * Decodes a Meta message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Meta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Meta;

        /**
         * Verifies a Meta message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Meta message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Meta
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Meta;

        /**
         * Creates a plain object from a Meta message. Also converts values to other types if specified.
         * @param message Meta
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Meta, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Meta to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CallGraph. */
    interface ICallGraph {

        /** CallGraph vertex */
        vertex?: (BinExport2.CallGraph.IVertex[]|null);

        /** CallGraph edge */
        edge?: (BinExport2.CallGraph.IEdge[]|null);
    }

    /** Represents a CallGraph. */
    class CallGraph implements ICallGraph {

        /**
         * Constructs a new CallGraph.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.ICallGraph);

        /** CallGraph vertex. */
        public vertex: BinExport2.CallGraph.IVertex[];

        /** CallGraph edge. */
        public edge: BinExport2.CallGraph.IEdge[];

        /**
         * Creates a new CallGraph instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CallGraph instance
         */
        public static create(properties?: BinExport2.ICallGraph): BinExport2.CallGraph;

        /**
         * Encodes the specified CallGraph message. Does not implicitly {@link BinExport2.CallGraph.verify|verify} messages.
         * @param message CallGraph message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.ICallGraph, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CallGraph message, length delimited. Does not implicitly {@link BinExport2.CallGraph.verify|verify} messages.
         * @param message CallGraph message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.ICallGraph, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CallGraph message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CallGraph
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.CallGraph;

        /**
         * Decodes a CallGraph message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CallGraph
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.CallGraph;

        /**
         * Verifies a CallGraph message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CallGraph message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CallGraph
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.CallGraph;

        /**
         * Creates a plain object from a CallGraph message. Also converts values to other types if specified.
         * @param message CallGraph
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.CallGraph, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CallGraph to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CallGraph {

        /** Properties of a Vertex. */
        interface IVertex {

            /** Vertex address */
            address?: (number|Long|null);

            /** Vertex type */
            type?: (BinExport2.CallGraph.Vertex.Type|null);

            /** Vertex mangledName */
            mangledName?: (string|null);

            /** Vertex demangledName */
            demangledName?: (string|null);

            /** Vertex libraryIndex */
            libraryIndex?: (number|null);

            /** Vertex moduleIndex */
            moduleIndex?: (number|null);
        }

        /** Represents a Vertex. */
        class Vertex implements IVertex {

            /**
             * Constructs a new Vertex.
             * @param [properties] Properties to set
             */
            constructor(properties?: BinExport2.CallGraph.IVertex);

            /** Vertex address. */
            public address: (number|Long);

            /** Vertex type. */
            public type: BinExport2.CallGraph.Vertex.Type;

            /** Vertex mangledName. */
            public mangledName: string;

            /** Vertex demangledName. */
            public demangledName: string;

            /** Vertex libraryIndex. */
            public libraryIndex: number;

            /** Vertex moduleIndex. */
            public moduleIndex: number;

            /**
             * Creates a new Vertex instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Vertex instance
             */
            public static create(properties?: BinExport2.CallGraph.IVertex): BinExport2.CallGraph.Vertex;

            /**
             * Encodes the specified Vertex message. Does not implicitly {@link BinExport2.CallGraph.Vertex.verify|verify} messages.
             * @param message Vertex message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BinExport2.CallGraph.IVertex, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Vertex message, length delimited. Does not implicitly {@link BinExport2.CallGraph.Vertex.verify|verify} messages.
             * @param message Vertex message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BinExport2.CallGraph.IVertex, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Vertex message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Vertex
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.CallGraph.Vertex;

            /**
             * Decodes a Vertex message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Vertex
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.CallGraph.Vertex;

            /**
             * Verifies a Vertex message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Vertex message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Vertex
             */
            public static fromObject(object: { [k: string]: any }): BinExport2.CallGraph.Vertex;

            /**
             * Creates a plain object from a Vertex message. Also converts values to other types if specified.
             * @param message Vertex
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BinExport2.CallGraph.Vertex, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Vertex to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Vertex {

            /** Type enum. */
            enum Type {
                NORMAL = 0,
                LIBRARY = 1,
                IMPORTED = 2,
                THUNK = 3,
                INVALID = 4
            }
        }

        /** Properties of an Edge. */
        interface IEdge {

            /** Edge sourceVertexIndex */
            sourceVertexIndex?: (number|null);

            /** Edge targetVertexIndex */
            targetVertexIndex?: (number|null);
        }

        /** Represents an Edge. */
        class Edge implements IEdge {

            /**
             * Constructs a new Edge.
             * @param [properties] Properties to set
             */
            constructor(properties?: BinExport2.CallGraph.IEdge);

            /** Edge sourceVertexIndex. */
            public sourceVertexIndex: number;

            /** Edge targetVertexIndex. */
            public targetVertexIndex: number;

            /**
             * Creates a new Edge instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Edge instance
             */
            public static create(properties?: BinExport2.CallGraph.IEdge): BinExport2.CallGraph.Edge;

            /**
             * Encodes the specified Edge message. Does not implicitly {@link BinExport2.CallGraph.Edge.verify|verify} messages.
             * @param message Edge message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BinExport2.CallGraph.IEdge, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Edge message, length delimited. Does not implicitly {@link BinExport2.CallGraph.Edge.verify|verify} messages.
             * @param message Edge message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BinExport2.CallGraph.IEdge, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Edge message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Edge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.CallGraph.Edge;

            /**
             * Decodes an Edge message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Edge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.CallGraph.Edge;

            /**
             * Verifies an Edge message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Edge message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Edge
             */
            public static fromObject(object: { [k: string]: any }): BinExport2.CallGraph.Edge;

            /**
             * Creates a plain object from an Edge message. Also converts values to other types if specified.
             * @param message Edge
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BinExport2.CallGraph.Edge, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Edge to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an Expression. */
    interface IExpression {

        /** Expression type */
        type?: (BinExport2.Expression.Type|null);

        /** Expression symbol */
        symbol?: (string|null);

        /** Expression immediate */
        immediate?: (number|Long|null);

        /** Expression parentIndex */
        parentIndex?: (number|null);

        /** Expression isRelocation */
        isRelocation?: (boolean|null);
    }

    /** Represents an Expression. */
    class Expression implements IExpression {

        /**
         * Constructs a new Expression.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IExpression);

        /** Expression type. */
        public type: BinExport2.Expression.Type;

        /** Expression symbol. */
        public symbol: string;

        /** Expression immediate. */
        public immediate: (number|Long);

        /** Expression parentIndex. */
        public parentIndex: number;

        /** Expression isRelocation. */
        public isRelocation: boolean;

        /**
         * Creates a new Expression instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Expression instance
         */
        public static create(properties?: BinExport2.IExpression): BinExport2.Expression;

        /**
         * Encodes the specified Expression message. Does not implicitly {@link BinExport2.Expression.verify|verify} messages.
         * @param message Expression message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IExpression, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Expression message, length delimited. Does not implicitly {@link BinExport2.Expression.verify|verify} messages.
         * @param message Expression message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IExpression, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Expression message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Expression
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Expression;

        /**
         * Decodes an Expression message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Expression
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Expression;

        /**
         * Verifies an Expression message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Expression message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Expression
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Expression;

        /**
         * Creates a plain object from an Expression message. Also converts values to other types if specified.
         * @param message Expression
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Expression, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Expression to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Expression {

        /** Type enum. */
        enum Type {
            SYMBOL = 1,
            IMMEDIATE_INT = 2,
            IMMEDIATE_FLOAT = 3,
            OPERATOR = 4,
            REGISTER = 5,
            SIZE_PREFIX = 6,
            DEREFERENCE = 7
        }
    }

    /** Properties of an Operand. */
    interface IOperand {

        /** Operand expressionIndex */
        expressionIndex?: (number[]|null);
    }

    /** Represents an Operand. */
    class Operand implements IOperand {

        /**
         * Constructs a new Operand.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IOperand);

        /** Operand expressionIndex. */
        public expressionIndex: number[];

        /**
         * Creates a new Operand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Operand instance
         */
        public static create(properties?: BinExport2.IOperand): BinExport2.Operand;

        /**
         * Encodes the specified Operand message. Does not implicitly {@link BinExport2.Operand.verify|verify} messages.
         * @param message Operand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IOperand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Operand message, length delimited. Does not implicitly {@link BinExport2.Operand.verify|verify} messages.
         * @param message Operand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IOperand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Operand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Operand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Operand;

        /**
         * Decodes an Operand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Operand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Operand;

        /**
         * Verifies an Operand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Operand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Operand
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Operand;

        /**
         * Creates a plain object from an Operand message. Also converts values to other types if specified.
         * @param message Operand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Operand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Operand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Mnemonic. */
    interface IMnemonic {

        /** Mnemonic name */
        name?: (string|null);
    }

    /** Represents a Mnemonic. */
    class Mnemonic implements IMnemonic {

        /**
         * Constructs a new Mnemonic.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IMnemonic);

        /** Mnemonic name. */
        public name: string;

        /**
         * Creates a new Mnemonic instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Mnemonic instance
         */
        public static create(properties?: BinExport2.IMnemonic): BinExport2.Mnemonic;

        /**
         * Encodes the specified Mnemonic message. Does not implicitly {@link BinExport2.Mnemonic.verify|verify} messages.
         * @param message Mnemonic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IMnemonic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Mnemonic message, length delimited. Does not implicitly {@link BinExport2.Mnemonic.verify|verify} messages.
         * @param message Mnemonic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IMnemonic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Mnemonic message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Mnemonic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Mnemonic;

        /**
         * Decodes a Mnemonic message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Mnemonic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Mnemonic;

        /**
         * Verifies a Mnemonic message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Mnemonic message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Mnemonic
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Mnemonic;

        /**
         * Creates a plain object from a Mnemonic message. Also converts values to other types if specified.
         * @param message Mnemonic
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Mnemonic, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Mnemonic to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Instruction. */
    interface IInstruction {

        /** Instruction address */
        address?: (number|Long|null);

        /** Instruction callTarget */
        callTarget?: ((number|Long)[]|null);

        /** Instruction mnemonicIndex */
        mnemonicIndex?: (number|null);

        /** Instruction operandIndex */
        operandIndex?: (number[]|null);

        /** Instruction rawBytes */
        rawBytes?: (Uint8Array|null);

        /** Instruction commentIndex */
        commentIndex?: (number[]|null);
    }

    /** Represents an Instruction. */
    class Instruction implements IInstruction {

        /**
         * Constructs a new Instruction.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IInstruction);

        /** Instruction address. */
        public address: (number|Long);

        /** Instruction callTarget. */
        public callTarget: (number|Long)[];

        /** Instruction mnemonicIndex. */
        public mnemonicIndex: number;

        /** Instruction operandIndex. */
        public operandIndex: number[];

        /** Instruction rawBytes. */
        public rawBytes: Uint8Array;

        /** Instruction commentIndex. */
        public commentIndex: number[];

        /**
         * Creates a new Instruction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Instruction instance
         */
        public static create(properties?: BinExport2.IInstruction): BinExport2.Instruction;

        /**
         * Encodes the specified Instruction message. Does not implicitly {@link BinExport2.Instruction.verify|verify} messages.
         * @param message Instruction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IInstruction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Instruction message, length delimited. Does not implicitly {@link BinExport2.Instruction.verify|verify} messages.
         * @param message Instruction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IInstruction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Instruction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Instruction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Instruction;

        /**
         * Decodes an Instruction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Instruction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Instruction;

        /**
         * Verifies an Instruction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Instruction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Instruction
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Instruction;

        /**
         * Creates a plain object from an Instruction message. Also converts values to other types if specified.
         * @param message Instruction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Instruction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Instruction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BasicBlock. */
    interface IBasicBlock {

        /** BasicBlock instructionIndex */
        instructionIndex?: (BinExport2.BasicBlock.IIndexRange[]|null);
    }

    /** Represents a BasicBlock. */
    class BasicBlock implements IBasicBlock {

        /**
         * Constructs a new BasicBlock.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IBasicBlock);

        /** BasicBlock instructionIndex. */
        public instructionIndex: BinExport2.BasicBlock.IIndexRange[];

        /**
         * Creates a new BasicBlock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BasicBlock instance
         */
        public static create(properties?: BinExport2.IBasicBlock): BinExport2.BasicBlock;

        /**
         * Encodes the specified BasicBlock message. Does not implicitly {@link BinExport2.BasicBlock.verify|verify} messages.
         * @param message BasicBlock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IBasicBlock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BasicBlock message, length delimited. Does not implicitly {@link BinExport2.BasicBlock.verify|verify} messages.
         * @param message BasicBlock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IBasicBlock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BasicBlock message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BasicBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.BasicBlock;

        /**
         * Decodes a BasicBlock message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BasicBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.BasicBlock;

        /**
         * Verifies a BasicBlock message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BasicBlock message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BasicBlock
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.BasicBlock;

        /**
         * Creates a plain object from a BasicBlock message. Also converts values to other types if specified.
         * @param message BasicBlock
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.BasicBlock, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BasicBlock to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BasicBlock {

        /** Properties of an IndexRange. */
        interface IIndexRange {

            /** IndexRange beginIndex */
            beginIndex?: (number|null);

            /** IndexRange endIndex */
            endIndex?: (number|null);
        }

        /** Represents an IndexRange. */
        class IndexRange implements IIndexRange {

            /**
             * Constructs a new IndexRange.
             * @param [properties] Properties to set
             */
            constructor(properties?: BinExport2.BasicBlock.IIndexRange);

            /** IndexRange beginIndex. */
            public beginIndex: number;

            /** IndexRange endIndex. */
            public endIndex: number;

            /**
             * Creates a new IndexRange instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IndexRange instance
             */
            public static create(properties?: BinExport2.BasicBlock.IIndexRange): BinExport2.BasicBlock.IndexRange;

            /**
             * Encodes the specified IndexRange message. Does not implicitly {@link BinExport2.BasicBlock.IndexRange.verify|verify} messages.
             * @param message IndexRange message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BinExport2.BasicBlock.IIndexRange, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified IndexRange message, length delimited. Does not implicitly {@link BinExport2.BasicBlock.IndexRange.verify|verify} messages.
             * @param message IndexRange message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BinExport2.BasicBlock.IIndexRange, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an IndexRange message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns IndexRange
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.BasicBlock.IndexRange;

            /**
             * Decodes an IndexRange message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns IndexRange
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.BasicBlock.IndexRange;

            /**
             * Verifies an IndexRange message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an IndexRange message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns IndexRange
             */
            public static fromObject(object: { [k: string]: any }): BinExport2.BasicBlock.IndexRange;

            /**
             * Creates a plain object from an IndexRange message. Also converts values to other types if specified.
             * @param message IndexRange
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BinExport2.BasicBlock.IndexRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this IndexRange to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a FlowGraph. */
    interface IFlowGraph {

        /** FlowGraph basicBlockIndex */
        basicBlockIndex?: (number[]|null);

        /** FlowGraph entryBasicBlockIndex */
        entryBasicBlockIndex?: (number|null);

        /** FlowGraph edge */
        edge?: (BinExport2.FlowGraph.IEdge[]|null);
    }

    /** Represents a FlowGraph. */
    class FlowGraph implements IFlowGraph {

        /**
         * Constructs a new FlowGraph.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IFlowGraph);

        /** FlowGraph basicBlockIndex. */
        public basicBlockIndex: number[];

        /** FlowGraph entryBasicBlockIndex. */
        public entryBasicBlockIndex: number;

        /** FlowGraph edge. */
        public edge: BinExport2.FlowGraph.IEdge[];

        /**
         * Creates a new FlowGraph instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FlowGraph instance
         */
        public static create(properties?: BinExport2.IFlowGraph): BinExport2.FlowGraph;

        /**
         * Encodes the specified FlowGraph message. Does not implicitly {@link BinExport2.FlowGraph.verify|verify} messages.
         * @param message FlowGraph message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IFlowGraph, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FlowGraph message, length delimited. Does not implicitly {@link BinExport2.FlowGraph.verify|verify} messages.
         * @param message FlowGraph message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IFlowGraph, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FlowGraph message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FlowGraph
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.FlowGraph;

        /**
         * Decodes a FlowGraph message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FlowGraph
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.FlowGraph;

        /**
         * Verifies a FlowGraph message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FlowGraph message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FlowGraph
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.FlowGraph;

        /**
         * Creates a plain object from a FlowGraph message. Also converts values to other types if specified.
         * @param message FlowGraph
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.FlowGraph, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FlowGraph to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace FlowGraph {

        /** Properties of an Edge. */
        interface IEdge {

            /** Edge sourceBasicBlockIndex */
            sourceBasicBlockIndex?: (number|null);

            /** Edge targetBasicBlockIndex */
            targetBasicBlockIndex?: (number|null);

            /** Edge type */
            type?: (BinExport2.FlowGraph.Edge.Type|null);

            /** Edge isBackEdge */
            isBackEdge?: (boolean|null);
        }

        /** Represents an Edge. */
        class Edge implements IEdge {

            /**
             * Constructs a new Edge.
             * @param [properties] Properties to set
             */
            constructor(properties?: BinExport2.FlowGraph.IEdge);

            /** Edge sourceBasicBlockIndex. */
            public sourceBasicBlockIndex: number;

            /** Edge targetBasicBlockIndex. */
            public targetBasicBlockIndex: number;

            /** Edge type. */
            public type: BinExport2.FlowGraph.Edge.Type;

            /** Edge isBackEdge. */
            public isBackEdge: boolean;

            /**
             * Creates a new Edge instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Edge instance
             */
            public static create(properties?: BinExport2.FlowGraph.IEdge): BinExport2.FlowGraph.Edge;

            /**
             * Encodes the specified Edge message. Does not implicitly {@link BinExport2.FlowGraph.Edge.verify|verify} messages.
             * @param message Edge message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BinExport2.FlowGraph.IEdge, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Edge message, length delimited. Does not implicitly {@link BinExport2.FlowGraph.Edge.verify|verify} messages.
             * @param message Edge message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BinExport2.FlowGraph.IEdge, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Edge message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Edge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.FlowGraph.Edge;

            /**
             * Decodes an Edge message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Edge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.FlowGraph.Edge;

            /**
             * Verifies an Edge message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Edge message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Edge
             */
            public static fromObject(object: { [k: string]: any }): BinExport2.FlowGraph.Edge;

            /**
             * Creates a plain object from an Edge message. Also converts values to other types if specified.
             * @param message Edge
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BinExport2.FlowGraph.Edge, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Edge to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Edge {

            /** Type enum. */
            enum Type {
                CONDITION_TRUE = 1,
                CONDITION_FALSE = 2,
                UNCONDITIONAL = 3,
                SWITCH = 4
            }
        }
    }

    /** Properties of a Reference. */
    interface IReference {

        /** Reference instructionIndex */
        instructionIndex?: (number|null);

        /** Reference instructionOperandIndex */
        instructionOperandIndex?: (number|null);

        /** Reference operandExpressionIndex */
        operandExpressionIndex?: (number|null);

        /** Reference stringTableIndex */
        stringTableIndex?: (number|null);
    }

    /** Represents a Reference. */
    class Reference implements IReference {

        /**
         * Constructs a new Reference.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IReference);

        /** Reference instructionIndex. */
        public instructionIndex: number;

        /** Reference instructionOperandIndex. */
        public instructionOperandIndex: number;

        /** Reference operandExpressionIndex. */
        public operandExpressionIndex: number;

        /** Reference stringTableIndex. */
        public stringTableIndex: number;

        /**
         * Creates a new Reference instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Reference instance
         */
        public static create(properties?: BinExport2.IReference): BinExport2.Reference;

        /**
         * Encodes the specified Reference message. Does not implicitly {@link BinExport2.Reference.verify|verify} messages.
         * @param message Reference message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IReference, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Reference message, length delimited. Does not implicitly {@link BinExport2.Reference.verify|verify} messages.
         * @param message Reference message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IReference, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Reference message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Reference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Reference;

        /**
         * Decodes a Reference message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Reference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Reference;

        /**
         * Verifies a Reference message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Reference message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Reference
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Reference;

        /**
         * Creates a plain object from a Reference message. Also converts values to other types if specified.
         * @param message Reference
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Reference, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Reference to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DataReference. */
    interface IDataReference {

        /** DataReference instructionIndex */
        instructionIndex?: (number|null);

        /** DataReference address */
        address?: (number|Long|null);
    }

    /** Represents a DataReference. */
    class DataReference implements IDataReference {

        /**
         * Constructs a new DataReference.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IDataReference);

        /** DataReference instructionIndex. */
        public instructionIndex: number;

        /** DataReference address. */
        public address: (number|Long);

        /**
         * Creates a new DataReference instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DataReference instance
         */
        public static create(properties?: BinExport2.IDataReference): BinExport2.DataReference;

        /**
         * Encodes the specified DataReference message. Does not implicitly {@link BinExport2.DataReference.verify|verify} messages.
         * @param message DataReference message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IDataReference, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DataReference message, length delimited. Does not implicitly {@link BinExport2.DataReference.verify|verify} messages.
         * @param message DataReference message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IDataReference, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DataReference message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DataReference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.DataReference;

        /**
         * Decodes a DataReference message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DataReference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.DataReference;

        /**
         * Verifies a DataReference message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DataReference message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DataReference
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.DataReference;

        /**
         * Creates a plain object from a DataReference message. Also converts values to other types if specified.
         * @param message DataReference
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.DataReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DataReference to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Comment. */
    interface IComment {

        /** Comment instructionIndex */
        instructionIndex?: (number|null);

        /** Comment stringTableIndex */
        stringTableIndex?: (number|null);

        /** Comment repeatable */
        repeatable?: (boolean|null);

        /** Comment type */
        type?: (BinExport2.Comment.Type|null);
    }

    /** Represents a Comment. */
    class Comment implements IComment {

        /**
         * Constructs a new Comment.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IComment);

        /** Comment instructionIndex. */
        public instructionIndex: number;

        /** Comment stringTableIndex. */
        public stringTableIndex: number;

        /** Comment repeatable. */
        public repeatable: boolean;

        /** Comment type. */
        public type: BinExport2.Comment.Type;

        /**
         * Creates a new Comment instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Comment instance
         */
        public static create(properties?: BinExport2.IComment): BinExport2.Comment;

        /**
         * Encodes the specified Comment message. Does not implicitly {@link BinExport2.Comment.verify|verify} messages.
         * @param message Comment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IComment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Comment message, length delimited. Does not implicitly {@link BinExport2.Comment.verify|verify} messages.
         * @param message Comment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IComment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Comment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Comment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Comment;

        /**
         * Decodes a Comment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Comment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Comment;

        /**
         * Verifies a Comment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Comment message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Comment
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Comment;

        /**
         * Creates a plain object from a Comment message. Also converts values to other types if specified.
         * @param message Comment
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Comment, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Comment to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Comment {

        /** Type enum. */
        enum Type {
            DEFAULT = 0,
            ANTERIOR = 1,
            POSTERIOR = 2,
            FUNCTION = 3
        }
    }

    /** Properties of a Section. */
    interface ISection {

        /** Section address */
        address?: (number|Long|null);

        /** Section size */
        size?: (number|Long|null);

        /** Section flagR */
        flagR?: (boolean|null);

        /** Section flagW */
        flagW?: (boolean|null);

        /** Section flagX */
        flagX?: (boolean|null);
    }

    /** Represents a Section. */
    class Section implements ISection {

        /**
         * Constructs a new Section.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.ISection);

        /** Section address. */
        public address: (number|Long);

        /** Section size. */
        public size: (number|Long);

        /** Section flagR. */
        public flagR: boolean;

        /** Section flagW. */
        public flagW: boolean;

        /** Section flagX. */
        public flagX: boolean;

        /**
         * Creates a new Section instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Section instance
         */
        public static create(properties?: BinExport2.ISection): BinExport2.Section;

        /**
         * Encodes the specified Section message. Does not implicitly {@link BinExport2.Section.verify|verify} messages.
         * @param message Section message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.ISection, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Section message, length delimited. Does not implicitly {@link BinExport2.Section.verify|verify} messages.
         * @param message Section message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.ISection, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Section message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Section
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Section;

        /**
         * Decodes a Section message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Section
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Section;

        /**
         * Verifies a Section message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Section message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Section
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Section;

        /**
         * Creates a plain object from a Section message. Also converts values to other types if specified.
         * @param message Section
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Section, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Section to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Library. */
    interface ILibrary {

        /** Library isStatic */
        isStatic?: (boolean|null);

        /** Library loadAddress */
        loadAddress?: (number|Long|null);

        /** Library name */
        name?: (string|null);
    }

    /** Represents a Library. */
    class Library implements ILibrary {

        /**
         * Constructs a new Library.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.ILibrary);

        /** Library isStatic. */
        public isStatic: boolean;

        /** Library loadAddress. */
        public loadAddress: (number|Long);

        /** Library name. */
        public name: string;

        /**
         * Creates a new Library instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Library instance
         */
        public static create(properties?: BinExport2.ILibrary): BinExport2.Library;

        /**
         * Encodes the specified Library message. Does not implicitly {@link BinExport2.Library.verify|verify} messages.
         * @param message Library message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.ILibrary, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Library message, length delimited. Does not implicitly {@link BinExport2.Library.verify|verify} messages.
         * @param message Library message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.ILibrary, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Library message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Library
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Library;

        /**
         * Decodes a Library message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Library
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Library;

        /**
         * Verifies a Library message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Library message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Library
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Library;

        /**
         * Creates a plain object from a Library message. Also converts values to other types if specified.
         * @param message Library
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Library, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Library to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Module. */
    interface IModule {

        /** Module name */
        name?: (string|null);
    }

    /** Represents a Module. */
    class Module implements IModule {

        /**
         * Constructs a new Module.
         * @param [properties] Properties to set
         */
        constructor(properties?: BinExport2.IModule);

        /** Module name. */
        public name: string;

        /**
         * Creates a new Module instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Module instance
         */
        public static create(properties?: BinExport2.IModule): BinExport2.Module;

        /**
         * Encodes the specified Module message. Does not implicitly {@link BinExport2.Module.verify|verify} messages.
         * @param message Module message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BinExport2.IModule, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Module message, length delimited. Does not implicitly {@link BinExport2.Module.verify|verify} messages.
         * @param message Module message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BinExport2.IModule, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Module message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Module
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BinExport2.Module;

        /**
         * Decodes a Module message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Module
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BinExport2.Module;

        /**
         * Verifies a Module message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Module message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Module
         */
        public static fromObject(object: { [k: string]: any }): BinExport2.Module;

        /**
         * Creates a plain object from a Module message. Also converts values to other types if specified.
         * @param message Module
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BinExport2.Module, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Module to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
