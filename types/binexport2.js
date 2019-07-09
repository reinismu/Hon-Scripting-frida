/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.BinExport2 = (function() {
    
        /**
         * Properties of a BinExport2.
         * @exports IBinExport2
         * @interface IBinExport2
         * @property {BinExport2.IMeta|null} [metaInformation] BinExport2 metaInformation
         * @property {Array.<BinExport2.IExpression>|null} [expression] BinExport2 expression
         * @property {Array.<BinExport2.IOperand>|null} [operand] BinExport2 operand
         * @property {Array.<BinExport2.IMnemonic>|null} [mnemonic] BinExport2 mnemonic
         * @property {Array.<BinExport2.IInstruction>|null} [instruction] BinExport2 instruction
         * @property {Array.<BinExport2.IBasicBlock>|null} [basicBlock] BinExport2 basicBlock
         * @property {Array.<BinExport2.IFlowGraph>|null} [flowGraph] BinExport2 flowGraph
         * @property {BinExport2.ICallGraph|null} [callGraph] BinExport2 callGraph
         * @property {Array.<string>|null} [stringTable] BinExport2 stringTable
         * @property {Array.<BinExport2.IReference>|null} [addressComment] BinExport2 addressComment
         * @property {Array.<BinExport2.IComment>|null} [comment] BinExport2 comment
         * @property {Array.<BinExport2.IReference>|null} [stringReference] BinExport2 stringReference
         * @property {Array.<BinExport2.IReference>|null} [expressionSubstitution] BinExport2 expressionSubstitution
         * @property {Array.<BinExport2.ISection>|null} [section] BinExport2 section
         * @property {Array.<BinExport2.ILibrary>|null} [library] BinExport2 library
         * @property {Array.<BinExport2.IDataReference>|null} [dataReference] BinExport2 dataReference
         * @property {Array.<BinExport2.IModule>|null} [module] BinExport2 module
         */
    
        /**
         * Constructs a new BinExport2.
         * @exports BinExport2
         * @classdesc Represents a BinExport2.
         * @implements IBinExport2
         * @constructor
         * @param {IBinExport2=} [properties] Properties to set
         */
        function BinExport2(properties) {
            this.expression = [];
            this.operand = [];
            this.mnemonic = [];
            this.instruction = [];
            this.basicBlock = [];
            this.flowGraph = [];
            this.stringTable = [];
            this.addressComment = [];
            this.comment = [];
            this.stringReference = [];
            this.expressionSubstitution = [];
            this.section = [];
            this.library = [];
            this.dataReference = [];
            this.module = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * BinExport2 metaInformation.
         * @member {BinExport2.IMeta|null|undefined} metaInformation
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.metaInformation = null;
    
        /**
         * BinExport2 expression.
         * @member {Array.<BinExport2.IExpression>} expression
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.expression = $util.emptyArray;
    
        /**
         * BinExport2 operand.
         * @member {Array.<BinExport2.IOperand>} operand
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.operand = $util.emptyArray;
    
        /**
         * BinExport2 mnemonic.
         * @member {Array.<BinExport2.IMnemonic>} mnemonic
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.mnemonic = $util.emptyArray;
    
        /**
         * BinExport2 instruction.
         * @member {Array.<BinExport2.IInstruction>} instruction
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.instruction = $util.emptyArray;
    
        /**
         * BinExport2 basicBlock.
         * @member {Array.<BinExport2.IBasicBlock>} basicBlock
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.basicBlock = $util.emptyArray;
    
        /**
         * BinExport2 flowGraph.
         * @member {Array.<BinExport2.IFlowGraph>} flowGraph
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.flowGraph = $util.emptyArray;
    
        /**
         * BinExport2 callGraph.
         * @member {BinExport2.ICallGraph|null|undefined} callGraph
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.callGraph = null;
    
        /**
         * BinExport2 stringTable.
         * @member {Array.<string>} stringTable
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.stringTable = $util.emptyArray;
    
        /**
         * BinExport2 addressComment.
         * @member {Array.<BinExport2.IReference>} addressComment
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.addressComment = $util.emptyArray;
    
        /**
         * BinExport2 comment.
         * @member {Array.<BinExport2.IComment>} comment
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.comment = $util.emptyArray;
    
        /**
         * BinExport2 stringReference.
         * @member {Array.<BinExport2.IReference>} stringReference
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.stringReference = $util.emptyArray;
    
        /**
         * BinExport2 expressionSubstitution.
         * @member {Array.<BinExport2.IReference>} expressionSubstitution
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.expressionSubstitution = $util.emptyArray;
    
        /**
         * BinExport2 section.
         * @member {Array.<BinExport2.ISection>} section
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.section = $util.emptyArray;
    
        /**
         * BinExport2 library.
         * @member {Array.<BinExport2.ILibrary>} library
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.library = $util.emptyArray;
    
        /**
         * BinExport2 dataReference.
         * @member {Array.<BinExport2.IDataReference>} dataReference
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.dataReference = $util.emptyArray;
    
        /**
         * BinExport2 module.
         * @member {Array.<BinExport2.IModule>} module
         * @memberof BinExport2
         * @instance
         */
        BinExport2.prototype.module = $util.emptyArray;
    
        /**
         * Creates a new BinExport2 instance using the specified properties.
         * @function create
         * @memberof BinExport2
         * @static
         * @param {IBinExport2=} [properties] Properties to set
         * @returns {BinExport2} BinExport2 instance
         */
        BinExport2.create = function create(properties) {
            return new BinExport2(properties);
        };
    
        /**
         * Encodes the specified BinExport2 message. Does not implicitly {@link BinExport2.verify|verify} messages.
         * @function encode
         * @memberof BinExport2
         * @static
         * @param {IBinExport2} message BinExport2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BinExport2.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.metaInformation != null && message.hasOwnProperty("metaInformation"))
                $root.BinExport2.Meta.encode(message.metaInformation, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.expression != null && message.expression.length)
                for (var i = 0; i < message.expression.length; ++i)
                    $root.BinExport2.Expression.encode(message.expression[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.operand != null && message.operand.length)
                for (var i = 0; i < message.operand.length; ++i)
                    $root.BinExport2.Operand.encode(message.operand[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.mnemonic != null && message.mnemonic.length)
                for (var i = 0; i < message.mnemonic.length; ++i)
                    $root.BinExport2.Mnemonic.encode(message.mnemonic[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.instruction != null && message.instruction.length)
                for (var i = 0; i < message.instruction.length; ++i)
                    $root.BinExport2.Instruction.encode(message.instruction[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.basicBlock != null && message.basicBlock.length)
                for (var i = 0; i < message.basicBlock.length; ++i)
                    $root.BinExport2.BasicBlock.encode(message.basicBlock[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.flowGraph != null && message.flowGraph.length)
                for (var i = 0; i < message.flowGraph.length; ++i)
                    $root.BinExport2.FlowGraph.encode(message.flowGraph[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.callGraph != null && message.hasOwnProperty("callGraph"))
                $root.BinExport2.CallGraph.encode(message.callGraph, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.stringTable != null && message.stringTable.length)
                for (var i = 0; i < message.stringTable.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.stringTable[i]);
            if (message.addressComment != null && message.addressComment.length)
                for (var i = 0; i < message.addressComment.length; ++i)
                    $root.BinExport2.Reference.encode(message.addressComment[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.stringReference != null && message.stringReference.length)
                for (var i = 0; i < message.stringReference.length; ++i)
                    $root.BinExport2.Reference.encode(message.stringReference[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.expressionSubstitution != null && message.expressionSubstitution.length)
                for (var i = 0; i < message.expressionSubstitution.length; ++i)
                    $root.BinExport2.Reference.encode(message.expressionSubstitution[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.section != null && message.section.length)
                for (var i = 0; i < message.section.length; ++i)
                    $root.BinExport2.Section.encode(message.section[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.library != null && message.library.length)
                for (var i = 0; i < message.library.length; ++i)
                    $root.BinExport2.Library.encode(message.library[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            if (message.dataReference != null && message.dataReference.length)
                for (var i = 0; i < message.dataReference.length; ++i)
                    $root.BinExport2.DataReference.encode(message.dataReference[i], writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.module != null && message.module.length)
                for (var i = 0; i < message.module.length; ++i)
                    $root.BinExport2.Module.encode(message.module[i], writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.comment != null && message.comment.length)
                for (var i = 0; i < message.comment.length; ++i)
                    $root.BinExport2.Comment.encode(message.comment[i], writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified BinExport2 message, length delimited. Does not implicitly {@link BinExport2.verify|verify} messages.
         * @function encodeDelimited
         * @memberof BinExport2
         * @static
         * @param {IBinExport2} message BinExport2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BinExport2.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a BinExport2 message from the specified reader or buffer.
         * @function decode
         * @memberof BinExport2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BinExport2} BinExport2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BinExport2.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.metaInformation = $root.BinExport2.Meta.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.expression && message.expression.length))
                        message.expression = [];
                    message.expression.push($root.BinExport2.Expression.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.operand && message.operand.length))
                        message.operand = [];
                    message.operand.push($root.BinExport2.Operand.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.mnemonic && message.mnemonic.length))
                        message.mnemonic = [];
                    message.mnemonic.push($root.BinExport2.Mnemonic.decode(reader, reader.uint32()));
                    break;
                case 5:
                    if (!(message.instruction && message.instruction.length))
                        message.instruction = [];
                    message.instruction.push($root.BinExport2.Instruction.decode(reader, reader.uint32()));
                    break;
                case 6:
                    if (!(message.basicBlock && message.basicBlock.length))
                        message.basicBlock = [];
                    message.basicBlock.push($root.BinExport2.BasicBlock.decode(reader, reader.uint32()));
                    break;
                case 7:
                    if (!(message.flowGraph && message.flowGraph.length))
                        message.flowGraph = [];
                    message.flowGraph.push($root.BinExport2.FlowGraph.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.callGraph = $root.BinExport2.CallGraph.decode(reader, reader.uint32());
                    break;
                case 9:
                    if (!(message.stringTable && message.stringTable.length))
                        message.stringTable = [];
                    message.stringTable.push(reader.string());
                    break;
                case 10:
                    if (!(message.addressComment && message.addressComment.length))
                        message.addressComment = [];
                    message.addressComment.push($root.BinExport2.Reference.decode(reader, reader.uint32()));
                    break;
                case 17:
                    if (!(message.comment && message.comment.length))
                        message.comment = [];
                    message.comment.push($root.BinExport2.Comment.decode(reader, reader.uint32()));
                    break;
                case 11:
                    if (!(message.stringReference && message.stringReference.length))
                        message.stringReference = [];
                    message.stringReference.push($root.BinExport2.Reference.decode(reader, reader.uint32()));
                    break;
                case 12:
                    if (!(message.expressionSubstitution && message.expressionSubstitution.length))
                        message.expressionSubstitution = [];
                    message.expressionSubstitution.push($root.BinExport2.Reference.decode(reader, reader.uint32()));
                    break;
                case 13:
                    if (!(message.section && message.section.length))
                        message.section = [];
                    message.section.push($root.BinExport2.Section.decode(reader, reader.uint32()));
                    break;
                case 14:
                    if (!(message.library && message.library.length))
                        message.library = [];
                    message.library.push($root.BinExport2.Library.decode(reader, reader.uint32()));
                    break;
                case 15:
                    if (!(message.dataReference && message.dataReference.length))
                        message.dataReference = [];
                    message.dataReference.push($root.BinExport2.DataReference.decode(reader, reader.uint32()));
                    break;
                case 16:
                    if (!(message.module && message.module.length))
                        message.module = [];
                    message.module.push($root.BinExport2.Module.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a BinExport2 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof BinExport2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {BinExport2} BinExport2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BinExport2.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a BinExport2 message.
         * @function verify
         * @memberof BinExport2
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BinExport2.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.metaInformation != null && message.hasOwnProperty("metaInformation")) {
                var error = $root.BinExport2.Meta.verify(message.metaInformation);
                if (error)
                    return "metaInformation." + error;
            }
            if (message.expression != null && message.hasOwnProperty("expression")) {
                if (!Array.isArray(message.expression))
                    return "expression: array expected";
                for (var i = 0; i < message.expression.length; ++i) {
                    var error = $root.BinExport2.Expression.verify(message.expression[i]);
                    if (error)
                        return "expression." + error;
                }
            }
            if (message.operand != null && message.hasOwnProperty("operand")) {
                if (!Array.isArray(message.operand))
                    return "operand: array expected";
                for (var i = 0; i < message.operand.length; ++i) {
                    var error = $root.BinExport2.Operand.verify(message.operand[i]);
                    if (error)
                        return "operand." + error;
                }
            }
            if (message.mnemonic != null && message.hasOwnProperty("mnemonic")) {
                if (!Array.isArray(message.mnemonic))
                    return "mnemonic: array expected";
                for (var i = 0; i < message.mnemonic.length; ++i) {
                    var error = $root.BinExport2.Mnemonic.verify(message.mnemonic[i]);
                    if (error)
                        return "mnemonic." + error;
                }
            }
            if (message.instruction != null && message.hasOwnProperty("instruction")) {
                if (!Array.isArray(message.instruction))
                    return "instruction: array expected";
                for (var i = 0; i < message.instruction.length; ++i) {
                    var error = $root.BinExport2.Instruction.verify(message.instruction[i]);
                    if (error)
                        return "instruction." + error;
                }
            }
            if (message.basicBlock != null && message.hasOwnProperty("basicBlock")) {
                if (!Array.isArray(message.basicBlock))
                    return "basicBlock: array expected";
                for (var i = 0; i < message.basicBlock.length; ++i) {
                    var error = $root.BinExport2.BasicBlock.verify(message.basicBlock[i]);
                    if (error)
                        return "basicBlock." + error;
                }
            }
            if (message.flowGraph != null && message.hasOwnProperty("flowGraph")) {
                if (!Array.isArray(message.flowGraph))
                    return "flowGraph: array expected";
                for (var i = 0; i < message.flowGraph.length; ++i) {
                    var error = $root.BinExport2.FlowGraph.verify(message.flowGraph[i]);
                    if (error)
                        return "flowGraph." + error;
                }
            }
            if (message.callGraph != null && message.hasOwnProperty("callGraph")) {
                var error = $root.BinExport2.CallGraph.verify(message.callGraph);
                if (error)
                    return "callGraph." + error;
            }
            if (message.stringTable != null && message.hasOwnProperty("stringTable")) {
                if (!Array.isArray(message.stringTable))
                    return "stringTable: array expected";
                for (var i = 0; i < message.stringTable.length; ++i)
                    if (!$util.isString(message.stringTable[i]))
                        return "stringTable: string[] expected";
            }
            if (message.addressComment != null && message.hasOwnProperty("addressComment")) {
                if (!Array.isArray(message.addressComment))
                    return "addressComment: array expected";
                for (var i = 0; i < message.addressComment.length; ++i) {
                    var error = $root.BinExport2.Reference.verify(message.addressComment[i]);
                    if (error)
                        return "addressComment." + error;
                }
            }
            if (message.comment != null && message.hasOwnProperty("comment")) {
                if (!Array.isArray(message.comment))
                    return "comment: array expected";
                for (var i = 0; i < message.comment.length; ++i) {
                    var error = $root.BinExport2.Comment.verify(message.comment[i]);
                    if (error)
                        return "comment." + error;
                }
            }
            if (message.stringReference != null && message.hasOwnProperty("stringReference")) {
                if (!Array.isArray(message.stringReference))
                    return "stringReference: array expected";
                for (var i = 0; i < message.stringReference.length; ++i) {
                    var error = $root.BinExport2.Reference.verify(message.stringReference[i]);
                    if (error)
                        return "stringReference." + error;
                }
            }
            if (message.expressionSubstitution != null && message.hasOwnProperty("expressionSubstitution")) {
                if (!Array.isArray(message.expressionSubstitution))
                    return "expressionSubstitution: array expected";
                for (var i = 0; i < message.expressionSubstitution.length; ++i) {
                    var error = $root.BinExport2.Reference.verify(message.expressionSubstitution[i]);
                    if (error)
                        return "expressionSubstitution." + error;
                }
            }
            if (message.section != null && message.hasOwnProperty("section")) {
                if (!Array.isArray(message.section))
                    return "section: array expected";
                for (var i = 0; i < message.section.length; ++i) {
                    var error = $root.BinExport2.Section.verify(message.section[i]);
                    if (error)
                        return "section." + error;
                }
            }
            if (message.library != null && message.hasOwnProperty("library")) {
                if (!Array.isArray(message.library))
                    return "library: array expected";
                for (var i = 0; i < message.library.length; ++i) {
                    var error = $root.BinExport2.Library.verify(message.library[i]);
                    if (error)
                        return "library." + error;
                }
            }
            if (message.dataReference != null && message.hasOwnProperty("dataReference")) {
                if (!Array.isArray(message.dataReference))
                    return "dataReference: array expected";
                for (var i = 0; i < message.dataReference.length; ++i) {
                    var error = $root.BinExport2.DataReference.verify(message.dataReference[i]);
                    if (error)
                        return "dataReference." + error;
                }
            }
            if (message.module != null && message.hasOwnProperty("module")) {
                if (!Array.isArray(message.module))
                    return "module: array expected";
                for (var i = 0; i < message.module.length; ++i) {
                    var error = $root.BinExport2.Module.verify(message.module[i]);
                    if (error)
                        return "module." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a BinExport2 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BinExport2
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BinExport2} BinExport2
         */
        BinExport2.fromObject = function fromObject(object) {
            if (object instanceof $root.BinExport2)
                return object;
            var message = new $root.BinExport2();
            if (object.metaInformation != null) {
                if (typeof object.metaInformation !== "object")
                    throw TypeError(".BinExport2.metaInformation: object expected");
                message.metaInformation = $root.BinExport2.Meta.fromObject(object.metaInformation);
            }
            if (object.expression) {
                if (!Array.isArray(object.expression))
                    throw TypeError(".BinExport2.expression: array expected");
                message.expression = [];
                for (var i = 0; i < object.expression.length; ++i) {
                    if (typeof object.expression[i] !== "object")
                        throw TypeError(".BinExport2.expression: object expected");
                    message.expression[i] = $root.BinExport2.Expression.fromObject(object.expression[i]);
                }
            }
            if (object.operand) {
                if (!Array.isArray(object.operand))
                    throw TypeError(".BinExport2.operand: array expected");
                message.operand = [];
                for (var i = 0; i < object.operand.length; ++i) {
                    if (typeof object.operand[i] !== "object")
                        throw TypeError(".BinExport2.operand: object expected");
                    message.operand[i] = $root.BinExport2.Operand.fromObject(object.operand[i]);
                }
            }
            if (object.mnemonic) {
                if (!Array.isArray(object.mnemonic))
                    throw TypeError(".BinExport2.mnemonic: array expected");
                message.mnemonic = [];
                for (var i = 0; i < object.mnemonic.length; ++i) {
                    if (typeof object.mnemonic[i] !== "object")
                        throw TypeError(".BinExport2.mnemonic: object expected");
                    message.mnemonic[i] = $root.BinExport2.Mnemonic.fromObject(object.mnemonic[i]);
                }
            }
            if (object.instruction) {
                if (!Array.isArray(object.instruction))
                    throw TypeError(".BinExport2.instruction: array expected");
                message.instruction = [];
                for (var i = 0; i < object.instruction.length; ++i) {
                    if (typeof object.instruction[i] !== "object")
                        throw TypeError(".BinExport2.instruction: object expected");
                    message.instruction[i] = $root.BinExport2.Instruction.fromObject(object.instruction[i]);
                }
            }
            if (object.basicBlock) {
                if (!Array.isArray(object.basicBlock))
                    throw TypeError(".BinExport2.basicBlock: array expected");
                message.basicBlock = [];
                for (var i = 0; i < object.basicBlock.length; ++i) {
                    if (typeof object.basicBlock[i] !== "object")
                        throw TypeError(".BinExport2.basicBlock: object expected");
                    message.basicBlock[i] = $root.BinExport2.BasicBlock.fromObject(object.basicBlock[i]);
                }
            }
            if (object.flowGraph) {
                if (!Array.isArray(object.flowGraph))
                    throw TypeError(".BinExport2.flowGraph: array expected");
                message.flowGraph = [];
                for (var i = 0; i < object.flowGraph.length; ++i) {
                    if (typeof object.flowGraph[i] !== "object")
                        throw TypeError(".BinExport2.flowGraph: object expected");
                    message.flowGraph[i] = $root.BinExport2.FlowGraph.fromObject(object.flowGraph[i]);
                }
            }
            if (object.callGraph != null) {
                if (typeof object.callGraph !== "object")
                    throw TypeError(".BinExport2.callGraph: object expected");
                message.callGraph = $root.BinExport2.CallGraph.fromObject(object.callGraph);
            }
            if (object.stringTable) {
                if (!Array.isArray(object.stringTable))
                    throw TypeError(".BinExport2.stringTable: array expected");
                message.stringTable = [];
                for (var i = 0; i < object.stringTable.length; ++i)
                    message.stringTable[i] = String(object.stringTable[i]);
            }
            if (object.addressComment) {
                if (!Array.isArray(object.addressComment))
                    throw TypeError(".BinExport2.addressComment: array expected");
                message.addressComment = [];
                for (var i = 0; i < object.addressComment.length; ++i) {
                    if (typeof object.addressComment[i] !== "object")
                        throw TypeError(".BinExport2.addressComment: object expected");
                    message.addressComment[i] = $root.BinExport2.Reference.fromObject(object.addressComment[i]);
                }
            }
            if (object.comment) {
                if (!Array.isArray(object.comment))
                    throw TypeError(".BinExport2.comment: array expected");
                message.comment = [];
                for (var i = 0; i < object.comment.length; ++i) {
                    if (typeof object.comment[i] !== "object")
                        throw TypeError(".BinExport2.comment: object expected");
                    message.comment[i] = $root.BinExport2.Comment.fromObject(object.comment[i]);
                }
            }
            if (object.stringReference) {
                if (!Array.isArray(object.stringReference))
                    throw TypeError(".BinExport2.stringReference: array expected");
                message.stringReference = [];
                for (var i = 0; i < object.stringReference.length; ++i) {
                    if (typeof object.stringReference[i] !== "object")
                        throw TypeError(".BinExport2.stringReference: object expected");
                    message.stringReference[i] = $root.BinExport2.Reference.fromObject(object.stringReference[i]);
                }
            }
            if (object.expressionSubstitution) {
                if (!Array.isArray(object.expressionSubstitution))
                    throw TypeError(".BinExport2.expressionSubstitution: array expected");
                message.expressionSubstitution = [];
                for (var i = 0; i < object.expressionSubstitution.length; ++i) {
                    if (typeof object.expressionSubstitution[i] !== "object")
                        throw TypeError(".BinExport2.expressionSubstitution: object expected");
                    message.expressionSubstitution[i] = $root.BinExport2.Reference.fromObject(object.expressionSubstitution[i]);
                }
            }
            if (object.section) {
                if (!Array.isArray(object.section))
                    throw TypeError(".BinExport2.section: array expected");
                message.section = [];
                for (var i = 0; i < object.section.length; ++i) {
                    if (typeof object.section[i] !== "object")
                        throw TypeError(".BinExport2.section: object expected");
                    message.section[i] = $root.BinExport2.Section.fromObject(object.section[i]);
                }
            }
            if (object.library) {
                if (!Array.isArray(object.library))
                    throw TypeError(".BinExport2.library: array expected");
                message.library = [];
                for (var i = 0; i < object.library.length; ++i) {
                    if (typeof object.library[i] !== "object")
                        throw TypeError(".BinExport2.library: object expected");
                    message.library[i] = $root.BinExport2.Library.fromObject(object.library[i]);
                }
            }
            if (object.dataReference) {
                if (!Array.isArray(object.dataReference))
                    throw TypeError(".BinExport2.dataReference: array expected");
                message.dataReference = [];
                for (var i = 0; i < object.dataReference.length; ++i) {
                    if (typeof object.dataReference[i] !== "object")
                        throw TypeError(".BinExport2.dataReference: object expected");
                    message.dataReference[i] = $root.BinExport2.DataReference.fromObject(object.dataReference[i]);
                }
            }
            if (object.module) {
                if (!Array.isArray(object.module))
                    throw TypeError(".BinExport2.module: array expected");
                message.module = [];
                for (var i = 0; i < object.module.length; ++i) {
                    if (typeof object.module[i] !== "object")
                        throw TypeError(".BinExport2.module: object expected");
                    message.module[i] = $root.BinExport2.Module.fromObject(object.module[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a BinExport2 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BinExport2
         * @static
         * @param {BinExport2} message BinExport2
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BinExport2.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.expression = [];
                object.operand = [];
                object.mnemonic = [];
                object.instruction = [];
                object.basicBlock = [];
                object.flowGraph = [];
                object.stringTable = [];
                object.addressComment = [];
                object.stringReference = [];
                object.expressionSubstitution = [];
                object.section = [];
                object.library = [];
                object.dataReference = [];
                object.module = [];
                object.comment = [];
            }
            if (options.defaults) {
                object.metaInformation = null;
                object.callGraph = null;
            }
            if (message.metaInformation != null && message.hasOwnProperty("metaInformation"))
                object.metaInformation = $root.BinExport2.Meta.toObject(message.metaInformation, options);
            if (message.expression && message.expression.length) {
                object.expression = [];
                for (var j = 0; j < message.expression.length; ++j)
                    object.expression[j] = $root.BinExport2.Expression.toObject(message.expression[j], options);
            }
            if (message.operand && message.operand.length) {
                object.operand = [];
                for (var j = 0; j < message.operand.length; ++j)
                    object.operand[j] = $root.BinExport2.Operand.toObject(message.operand[j], options);
            }
            if (message.mnemonic && message.mnemonic.length) {
                object.mnemonic = [];
                for (var j = 0; j < message.mnemonic.length; ++j)
                    object.mnemonic[j] = $root.BinExport2.Mnemonic.toObject(message.mnemonic[j], options);
            }
            if (message.instruction && message.instruction.length) {
                object.instruction = [];
                for (var j = 0; j < message.instruction.length; ++j)
                    object.instruction[j] = $root.BinExport2.Instruction.toObject(message.instruction[j], options);
            }
            if (message.basicBlock && message.basicBlock.length) {
                object.basicBlock = [];
                for (var j = 0; j < message.basicBlock.length; ++j)
                    object.basicBlock[j] = $root.BinExport2.BasicBlock.toObject(message.basicBlock[j], options);
            }
            if (message.flowGraph && message.flowGraph.length) {
                object.flowGraph = [];
                for (var j = 0; j < message.flowGraph.length; ++j)
                    object.flowGraph[j] = $root.BinExport2.FlowGraph.toObject(message.flowGraph[j], options);
            }
            if (message.callGraph != null && message.hasOwnProperty("callGraph"))
                object.callGraph = $root.BinExport2.CallGraph.toObject(message.callGraph, options);
            if (message.stringTable && message.stringTable.length) {
                object.stringTable = [];
                for (var j = 0; j < message.stringTable.length; ++j)
                    object.stringTable[j] = message.stringTable[j];
            }
            if (message.addressComment && message.addressComment.length) {
                object.addressComment = [];
                for (var j = 0; j < message.addressComment.length; ++j)
                    object.addressComment[j] = $root.BinExport2.Reference.toObject(message.addressComment[j], options);
            }
            if (message.stringReference && message.stringReference.length) {
                object.stringReference = [];
                for (var j = 0; j < message.stringReference.length; ++j)
                    object.stringReference[j] = $root.BinExport2.Reference.toObject(message.stringReference[j], options);
            }
            if (message.expressionSubstitution && message.expressionSubstitution.length) {
                object.expressionSubstitution = [];
                for (var j = 0; j < message.expressionSubstitution.length; ++j)
                    object.expressionSubstitution[j] = $root.BinExport2.Reference.toObject(message.expressionSubstitution[j], options);
            }
            if (message.section && message.section.length) {
                object.section = [];
                for (var j = 0; j < message.section.length; ++j)
                    object.section[j] = $root.BinExport2.Section.toObject(message.section[j], options);
            }
            if (message.library && message.library.length) {
                object.library = [];
                for (var j = 0; j < message.library.length; ++j)
                    object.library[j] = $root.BinExport2.Library.toObject(message.library[j], options);
            }
            if (message.dataReference && message.dataReference.length) {
                object.dataReference = [];
                for (var j = 0; j < message.dataReference.length; ++j)
                    object.dataReference[j] = $root.BinExport2.DataReference.toObject(message.dataReference[j], options);
            }
            if (message.module && message.module.length) {
                object.module = [];
                for (var j = 0; j < message.module.length; ++j)
                    object.module[j] = $root.BinExport2.Module.toObject(message.module[j], options);
            }
            if (message.comment && message.comment.length) {
                object.comment = [];
                for (var j = 0; j < message.comment.length; ++j)
                    object.comment[j] = $root.BinExport2.Comment.toObject(message.comment[j], options);
            }
            return object;
        };
    
        /**
         * Converts this BinExport2 to JSON.
         * @function toJSON
         * @memberof BinExport2
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BinExport2.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        BinExport2.Meta = (function() {
    
            /**
             * Properties of a Meta.
             * @memberof BinExport2
             * @interface IMeta
             * @property {string|null} [executableName] Meta executableName
             * @property {string|null} [executableId] Meta executableId
             * @property {string|null} [architectureName] Meta architectureName
             * @property {number|Long|null} [timestamp] Meta timestamp
             * @property {Uint8Array|null} [paddingV1] Meta paddingV1
             */
    
            /**
             * Constructs a new Meta.
             * @memberof BinExport2
             * @classdesc Represents a Meta.
             * @implements IMeta
             * @constructor
             * @param {BinExport2.IMeta=} [properties] Properties to set
             */
            function Meta(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Meta executableName.
             * @member {string} executableName
             * @memberof BinExport2.Meta
             * @instance
             */
            Meta.prototype.executableName = "";
    
            /**
             * Meta executableId.
             * @member {string} executableId
             * @memberof BinExport2.Meta
             * @instance
             */
            Meta.prototype.executableId = "";
    
            /**
             * Meta architectureName.
             * @member {string} architectureName
             * @memberof BinExport2.Meta
             * @instance
             */
            Meta.prototype.architectureName = "";
    
            /**
             * Meta timestamp.
             * @member {number|Long} timestamp
             * @memberof BinExport2.Meta
             * @instance
             */
            Meta.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Meta paddingV1.
             * @member {Uint8Array} paddingV1
             * @memberof BinExport2.Meta
             * @instance
             */
            Meta.prototype.paddingV1 = $util.newBuffer([]);
    
            /**
             * Creates a new Meta instance using the specified properties.
             * @function create
             * @memberof BinExport2.Meta
             * @static
             * @param {BinExport2.IMeta=} [properties] Properties to set
             * @returns {BinExport2.Meta} Meta instance
             */
            Meta.create = function create(properties) {
                return new Meta(properties);
            };
    
            /**
             * Encodes the specified Meta message. Does not implicitly {@link BinExport2.Meta.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Meta
             * @static
             * @param {BinExport2.IMeta} message Meta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Meta.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.executableName != null && message.hasOwnProperty("executableName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.executableName);
                if (message.executableId != null && message.hasOwnProperty("executableId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.executableId);
                if (message.architectureName != null && message.hasOwnProperty("architectureName"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.architectureName);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
                if (message.paddingV1 != null && message.hasOwnProperty("paddingV1"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.paddingV1);
                return writer;
            };
    
            /**
             * Encodes the specified Meta message, length delimited. Does not implicitly {@link BinExport2.Meta.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Meta
             * @static
             * @param {BinExport2.IMeta} message Meta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Meta.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Meta message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Meta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Meta} Meta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Meta.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Meta();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.executableName = reader.string();
                        break;
                    case 2:
                        message.executableId = reader.string();
                        break;
                    case 3:
                        message.architectureName = reader.string();
                        break;
                    case 4:
                        message.timestamp = reader.int64();
                        break;
                    case 5:
                        message.paddingV1 = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Meta message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Meta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Meta} Meta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Meta.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Meta message.
             * @function verify
             * @memberof BinExport2.Meta
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Meta.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.executableName != null && message.hasOwnProperty("executableName"))
                    if (!$util.isString(message.executableName))
                        return "executableName: string expected";
                if (message.executableId != null && message.hasOwnProperty("executableId"))
                    if (!$util.isString(message.executableId))
                        return "executableId: string expected";
                if (message.architectureName != null && message.hasOwnProperty("architectureName"))
                    if (!$util.isString(message.architectureName))
                        return "architectureName: string expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.paddingV1 != null && message.hasOwnProperty("paddingV1"))
                    if (!(message.paddingV1 && typeof message.paddingV1.length === "number" || $util.isString(message.paddingV1)))
                        return "paddingV1: buffer expected";
                return null;
            };
    
            /**
             * Creates a Meta message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Meta
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Meta} Meta
             */
            Meta.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Meta)
                    return object;
                var message = new $root.BinExport2.Meta();
                if (object.executableName != null)
                    message.executableName = String(object.executableName);
                if (object.executableId != null)
                    message.executableId = String(object.executableId);
                if (object.architectureName != null)
                    message.architectureName = String(object.architectureName);
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.paddingV1 != null)
                    if (typeof object.paddingV1 === "string")
                        $util.base64.decode(object.paddingV1, message.paddingV1 = $util.newBuffer($util.base64.length(object.paddingV1)), 0);
                    else if (object.paddingV1.length)
                        message.paddingV1 = object.paddingV1;
                return message;
            };
    
            /**
             * Creates a plain object from a Meta message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Meta
             * @static
             * @param {BinExport2.Meta} message Meta
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Meta.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.executableName = "";
                    object.executableId = "";
                    object.architectureName = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.paddingV1 = "";
                    else {
                        object.paddingV1 = [];
                        if (options.bytes !== Array)
                            object.paddingV1 = $util.newBuffer(object.paddingV1);
                    }
                }
                if (message.executableName != null && message.hasOwnProperty("executableName"))
                    object.executableName = message.executableName;
                if (message.executableId != null && message.hasOwnProperty("executableId"))
                    object.executableId = message.executableId;
                if (message.architectureName != null && message.hasOwnProperty("architectureName"))
                    object.architectureName = message.architectureName;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.paddingV1 != null && message.hasOwnProperty("paddingV1"))
                    object.paddingV1 = options.bytes === String ? $util.base64.encode(message.paddingV1, 0, message.paddingV1.length) : options.bytes === Array ? Array.prototype.slice.call(message.paddingV1) : message.paddingV1;
                return object;
            };
    
            /**
             * Converts this Meta to JSON.
             * @function toJSON
             * @memberof BinExport2.Meta
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Meta.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Meta;
        })();
    
        BinExport2.CallGraph = (function() {
    
            /**
             * Properties of a CallGraph.
             * @memberof BinExport2
             * @interface ICallGraph
             * @property {Array.<BinExport2.CallGraph.IVertex>|null} [vertex] CallGraph vertex
             * @property {Array.<BinExport2.CallGraph.IEdge>|null} [edge] CallGraph edge
             */
    
            /**
             * Constructs a new CallGraph.
             * @memberof BinExport2
             * @classdesc Represents a CallGraph.
             * @implements ICallGraph
             * @constructor
             * @param {BinExport2.ICallGraph=} [properties] Properties to set
             */
            function CallGraph(properties) {
                this.vertex = [];
                this.edge = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CallGraph vertex.
             * @member {Array.<BinExport2.CallGraph.IVertex>} vertex
             * @memberof BinExport2.CallGraph
             * @instance
             */
            CallGraph.prototype.vertex = $util.emptyArray;
    
            /**
             * CallGraph edge.
             * @member {Array.<BinExport2.CallGraph.IEdge>} edge
             * @memberof BinExport2.CallGraph
             * @instance
             */
            CallGraph.prototype.edge = $util.emptyArray;
    
            /**
             * Creates a new CallGraph instance using the specified properties.
             * @function create
             * @memberof BinExport2.CallGraph
             * @static
             * @param {BinExport2.ICallGraph=} [properties] Properties to set
             * @returns {BinExport2.CallGraph} CallGraph instance
             */
            CallGraph.create = function create(properties) {
                return new CallGraph(properties);
            };
    
            /**
             * Encodes the specified CallGraph message. Does not implicitly {@link BinExport2.CallGraph.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.CallGraph
             * @static
             * @param {BinExport2.ICallGraph} message CallGraph message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CallGraph.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.vertex != null && message.vertex.length)
                    for (var i = 0; i < message.vertex.length; ++i)
                        $root.BinExport2.CallGraph.Vertex.encode(message.vertex[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.edge != null && message.edge.length)
                    for (var i = 0; i < message.edge.length; ++i)
                        $root.BinExport2.CallGraph.Edge.encode(message.edge[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CallGraph message, length delimited. Does not implicitly {@link BinExport2.CallGraph.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.CallGraph
             * @static
             * @param {BinExport2.ICallGraph} message CallGraph message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CallGraph.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CallGraph message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.CallGraph
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.CallGraph} CallGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CallGraph.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.CallGraph();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.vertex && message.vertex.length))
                            message.vertex = [];
                        message.vertex.push($root.BinExport2.CallGraph.Vertex.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        if (!(message.edge && message.edge.length))
                            message.edge = [];
                        message.edge.push($root.BinExport2.CallGraph.Edge.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CallGraph message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.CallGraph
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.CallGraph} CallGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CallGraph.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CallGraph message.
             * @function verify
             * @memberof BinExport2.CallGraph
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CallGraph.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.vertex != null && message.hasOwnProperty("vertex")) {
                    if (!Array.isArray(message.vertex))
                        return "vertex: array expected";
                    for (var i = 0; i < message.vertex.length; ++i) {
                        var error = $root.BinExport2.CallGraph.Vertex.verify(message.vertex[i]);
                        if (error)
                            return "vertex." + error;
                    }
                }
                if (message.edge != null && message.hasOwnProperty("edge")) {
                    if (!Array.isArray(message.edge))
                        return "edge: array expected";
                    for (var i = 0; i < message.edge.length; ++i) {
                        var error = $root.BinExport2.CallGraph.Edge.verify(message.edge[i]);
                        if (error)
                            return "edge." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a CallGraph message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.CallGraph
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.CallGraph} CallGraph
             */
            CallGraph.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.CallGraph)
                    return object;
                var message = new $root.BinExport2.CallGraph();
                if (object.vertex) {
                    if (!Array.isArray(object.vertex))
                        throw TypeError(".BinExport2.CallGraph.vertex: array expected");
                    message.vertex = [];
                    for (var i = 0; i < object.vertex.length; ++i) {
                        if (typeof object.vertex[i] !== "object")
                            throw TypeError(".BinExport2.CallGraph.vertex: object expected");
                        message.vertex[i] = $root.BinExport2.CallGraph.Vertex.fromObject(object.vertex[i]);
                    }
                }
                if (object.edge) {
                    if (!Array.isArray(object.edge))
                        throw TypeError(".BinExport2.CallGraph.edge: array expected");
                    message.edge = [];
                    for (var i = 0; i < object.edge.length; ++i) {
                        if (typeof object.edge[i] !== "object")
                            throw TypeError(".BinExport2.CallGraph.edge: object expected");
                        message.edge[i] = $root.BinExport2.CallGraph.Edge.fromObject(object.edge[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CallGraph message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.CallGraph
             * @static
             * @param {BinExport2.CallGraph} message CallGraph
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CallGraph.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.vertex = [];
                    object.edge = [];
                }
                if (message.vertex && message.vertex.length) {
                    object.vertex = [];
                    for (var j = 0; j < message.vertex.length; ++j)
                        object.vertex[j] = $root.BinExport2.CallGraph.Vertex.toObject(message.vertex[j], options);
                }
                if (message.edge && message.edge.length) {
                    object.edge = [];
                    for (var j = 0; j < message.edge.length; ++j)
                        object.edge[j] = $root.BinExport2.CallGraph.Edge.toObject(message.edge[j], options);
                }
                return object;
            };
    
            /**
             * Converts this CallGraph to JSON.
             * @function toJSON
             * @memberof BinExport2.CallGraph
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CallGraph.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            CallGraph.Vertex = (function() {
    
                /**
                 * Properties of a Vertex.
                 * @memberof BinExport2.CallGraph
                 * @interface IVertex
                 * @property {number|Long|null} [address] Vertex address
                 * @property {BinExport2.CallGraph.Vertex.Type|null} [type] Vertex type
                 * @property {string|null} [mangledName] Vertex mangledName
                 * @property {string|null} [demangledName] Vertex demangledName
                 * @property {number|null} [libraryIndex] Vertex libraryIndex
                 * @property {number|null} [moduleIndex] Vertex moduleIndex
                 */
    
                /**
                 * Constructs a new Vertex.
                 * @memberof BinExport2.CallGraph
                 * @classdesc Represents a Vertex.
                 * @implements IVertex
                 * @constructor
                 * @param {BinExport2.CallGraph.IVertex=} [properties] Properties to set
                 */
                function Vertex(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Vertex address.
                 * @member {number|Long} address
                 * @memberof BinExport2.CallGraph.Vertex
                 * @instance
                 */
                Vertex.prototype.address = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
                /**
                 * Vertex type.
                 * @member {BinExport2.CallGraph.Vertex.Type} type
                 * @memberof BinExport2.CallGraph.Vertex
                 * @instance
                 */
                Vertex.prototype.type = 0;
    
                /**
                 * Vertex mangledName.
                 * @member {string} mangledName
                 * @memberof BinExport2.CallGraph.Vertex
                 * @instance
                 */
                Vertex.prototype.mangledName = "";
    
                /**
                 * Vertex demangledName.
                 * @member {string} demangledName
                 * @memberof BinExport2.CallGraph.Vertex
                 * @instance
                 */
                Vertex.prototype.demangledName = "";
    
                /**
                 * Vertex libraryIndex.
                 * @member {number} libraryIndex
                 * @memberof BinExport2.CallGraph.Vertex
                 * @instance
                 */
                Vertex.prototype.libraryIndex = 0;
    
                /**
                 * Vertex moduleIndex.
                 * @member {number} moduleIndex
                 * @memberof BinExport2.CallGraph.Vertex
                 * @instance
                 */
                Vertex.prototype.moduleIndex = 0;
    
                /**
                 * Creates a new Vertex instance using the specified properties.
                 * @function create
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {BinExport2.CallGraph.IVertex=} [properties] Properties to set
                 * @returns {BinExport2.CallGraph.Vertex} Vertex instance
                 */
                Vertex.create = function create(properties) {
                    return new Vertex(properties);
                };
    
                /**
                 * Encodes the specified Vertex message. Does not implicitly {@link BinExport2.CallGraph.Vertex.verify|verify} messages.
                 * @function encode
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {BinExport2.CallGraph.IVertex} message Vertex message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Vertex.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.address != null && message.hasOwnProperty("address"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.address);
                    if (message.type != null && message.hasOwnProperty("type"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                    if (message.mangledName != null && message.hasOwnProperty("mangledName"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.mangledName);
                    if (message.demangledName != null && message.hasOwnProperty("demangledName"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.demangledName);
                    if (message.libraryIndex != null && message.hasOwnProperty("libraryIndex"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.libraryIndex);
                    if (message.moduleIndex != null && message.hasOwnProperty("moduleIndex"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.moduleIndex);
                    return writer;
                };
    
                /**
                 * Encodes the specified Vertex message, length delimited. Does not implicitly {@link BinExport2.CallGraph.Vertex.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {BinExport2.CallGraph.IVertex} message Vertex message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Vertex.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Vertex message from the specified reader or buffer.
                 * @function decode
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {BinExport2.CallGraph.Vertex} Vertex
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Vertex.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.CallGraph.Vertex();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.address = reader.uint64();
                            break;
                        case 2:
                            message.type = reader.int32();
                            break;
                        case 3:
                            message.mangledName = reader.string();
                            break;
                        case 4:
                            message.demangledName = reader.string();
                            break;
                        case 5:
                            message.libraryIndex = reader.int32();
                            break;
                        case 6:
                            message.moduleIndex = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Vertex message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {BinExport2.CallGraph.Vertex} Vertex
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Vertex.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Vertex message.
                 * @function verify
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Vertex.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.address != null && message.hasOwnProperty("address"))
                        if (!$util.isInteger(message.address) && !(message.address && $util.isInteger(message.address.low) && $util.isInteger(message.address.high)))
                            return "address: integer|Long expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    if (message.mangledName != null && message.hasOwnProperty("mangledName"))
                        if (!$util.isString(message.mangledName))
                            return "mangledName: string expected";
                    if (message.demangledName != null && message.hasOwnProperty("demangledName"))
                        if (!$util.isString(message.demangledName))
                            return "demangledName: string expected";
                    if (message.libraryIndex != null && message.hasOwnProperty("libraryIndex"))
                        if (!$util.isInteger(message.libraryIndex))
                            return "libraryIndex: integer expected";
                    if (message.moduleIndex != null && message.hasOwnProperty("moduleIndex"))
                        if (!$util.isInteger(message.moduleIndex))
                            return "moduleIndex: integer expected";
                    return null;
                };
    
                /**
                 * Creates a Vertex message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {BinExport2.CallGraph.Vertex} Vertex
                 */
                Vertex.fromObject = function fromObject(object) {
                    if (object instanceof $root.BinExport2.CallGraph.Vertex)
                        return object;
                    var message = new $root.BinExport2.CallGraph.Vertex();
                    if (object.address != null)
                        if ($util.Long)
                            (message.address = $util.Long.fromValue(object.address)).unsigned = true;
                        else if (typeof object.address === "string")
                            message.address = parseInt(object.address, 10);
                        else if (typeof object.address === "number")
                            message.address = object.address;
                        else if (typeof object.address === "object")
                            message.address = new $util.LongBits(object.address.low >>> 0, object.address.high >>> 0).toNumber(true);
                    switch (object.type) {
                    case "NORMAL":
                    case 0:
                        message.type = 0;
                        break;
                    case "LIBRARY":
                    case 1:
                        message.type = 1;
                        break;
                    case "IMPORTED":
                    case 2:
                        message.type = 2;
                        break;
                    case "THUNK":
                    case 3:
                        message.type = 3;
                        break;
                    case "INVALID":
                    case 4:
                        message.type = 4;
                        break;
                    }
                    if (object.mangledName != null)
                        message.mangledName = String(object.mangledName);
                    if (object.demangledName != null)
                        message.demangledName = String(object.demangledName);
                    if (object.libraryIndex != null)
                        message.libraryIndex = object.libraryIndex | 0;
                    if (object.moduleIndex != null)
                        message.moduleIndex = object.moduleIndex | 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a Vertex message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof BinExport2.CallGraph.Vertex
                 * @static
                 * @param {BinExport2.CallGraph.Vertex} message Vertex
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Vertex.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.address = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.address = options.longs === String ? "0" : 0;
                        object.type = options.enums === String ? "NORMAL" : 0;
                        object.mangledName = "";
                        object.demangledName = "";
                        object.libraryIndex = 0;
                        object.moduleIndex = 0;
                    }
                    if (message.address != null && message.hasOwnProperty("address"))
                        if (typeof message.address === "number")
                            object.address = options.longs === String ? String(message.address) : message.address;
                        else
                            object.address = options.longs === String ? $util.Long.prototype.toString.call(message.address) : options.longs === Number ? new $util.LongBits(message.address.low >>> 0, message.address.high >>> 0).toNumber(true) : message.address;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.BinExport2.CallGraph.Vertex.Type[message.type] : message.type;
                    if (message.mangledName != null && message.hasOwnProperty("mangledName"))
                        object.mangledName = message.mangledName;
                    if (message.demangledName != null && message.hasOwnProperty("demangledName"))
                        object.demangledName = message.demangledName;
                    if (message.libraryIndex != null && message.hasOwnProperty("libraryIndex"))
                        object.libraryIndex = message.libraryIndex;
                    if (message.moduleIndex != null && message.hasOwnProperty("moduleIndex"))
                        object.moduleIndex = message.moduleIndex;
                    return object;
                };
    
                /**
                 * Converts this Vertex to JSON.
                 * @function toJSON
                 * @memberof BinExport2.CallGraph.Vertex
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Vertex.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Type enum.
                 * @name BinExport2.CallGraph.Vertex.Type
                 * @enum {string}
                 * @property {number} NORMAL=0 NORMAL value
                 * @property {number} LIBRARY=1 LIBRARY value
                 * @property {number} IMPORTED=2 IMPORTED value
                 * @property {number} THUNK=3 THUNK value
                 * @property {number} INVALID=4 INVALID value
                 */
                Vertex.Type = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "NORMAL"] = 0;
                    values[valuesById[1] = "LIBRARY"] = 1;
                    values[valuesById[2] = "IMPORTED"] = 2;
                    values[valuesById[3] = "THUNK"] = 3;
                    values[valuesById[4] = "INVALID"] = 4;
                    return values;
                })();
    
                return Vertex;
            })();
    
            CallGraph.Edge = (function() {
    
                /**
                 * Properties of an Edge.
                 * @memberof BinExport2.CallGraph
                 * @interface IEdge
                 * @property {number|null} [sourceVertexIndex] Edge sourceVertexIndex
                 * @property {number|null} [targetVertexIndex] Edge targetVertexIndex
                 */
    
                /**
                 * Constructs a new Edge.
                 * @memberof BinExport2.CallGraph
                 * @classdesc Represents an Edge.
                 * @implements IEdge
                 * @constructor
                 * @param {BinExport2.CallGraph.IEdge=} [properties] Properties to set
                 */
                function Edge(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Edge sourceVertexIndex.
                 * @member {number} sourceVertexIndex
                 * @memberof BinExport2.CallGraph.Edge
                 * @instance
                 */
                Edge.prototype.sourceVertexIndex = 0;
    
                /**
                 * Edge targetVertexIndex.
                 * @member {number} targetVertexIndex
                 * @memberof BinExport2.CallGraph.Edge
                 * @instance
                 */
                Edge.prototype.targetVertexIndex = 0;
    
                /**
                 * Creates a new Edge instance using the specified properties.
                 * @function create
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {BinExport2.CallGraph.IEdge=} [properties] Properties to set
                 * @returns {BinExport2.CallGraph.Edge} Edge instance
                 */
                Edge.create = function create(properties) {
                    return new Edge(properties);
                };
    
                /**
                 * Encodes the specified Edge message. Does not implicitly {@link BinExport2.CallGraph.Edge.verify|verify} messages.
                 * @function encode
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {BinExport2.CallGraph.IEdge} message Edge message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Edge.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.sourceVertexIndex != null && message.hasOwnProperty("sourceVertexIndex"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sourceVertexIndex);
                    if (message.targetVertexIndex != null && message.hasOwnProperty("targetVertexIndex"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.targetVertexIndex);
                    return writer;
                };
    
                /**
                 * Encodes the specified Edge message, length delimited. Does not implicitly {@link BinExport2.CallGraph.Edge.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {BinExport2.CallGraph.IEdge} message Edge message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Edge.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Edge message from the specified reader or buffer.
                 * @function decode
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {BinExport2.CallGraph.Edge} Edge
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Edge.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.CallGraph.Edge();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.sourceVertexIndex = reader.int32();
                            break;
                        case 2:
                            message.targetVertexIndex = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Edge message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {BinExport2.CallGraph.Edge} Edge
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Edge.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Edge message.
                 * @function verify
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Edge.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.sourceVertexIndex != null && message.hasOwnProperty("sourceVertexIndex"))
                        if (!$util.isInteger(message.sourceVertexIndex))
                            return "sourceVertexIndex: integer expected";
                    if (message.targetVertexIndex != null && message.hasOwnProperty("targetVertexIndex"))
                        if (!$util.isInteger(message.targetVertexIndex))
                            return "targetVertexIndex: integer expected";
                    return null;
                };
    
                /**
                 * Creates an Edge message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {BinExport2.CallGraph.Edge} Edge
                 */
                Edge.fromObject = function fromObject(object) {
                    if (object instanceof $root.BinExport2.CallGraph.Edge)
                        return object;
                    var message = new $root.BinExport2.CallGraph.Edge();
                    if (object.sourceVertexIndex != null)
                        message.sourceVertexIndex = object.sourceVertexIndex | 0;
                    if (object.targetVertexIndex != null)
                        message.targetVertexIndex = object.targetVertexIndex | 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from an Edge message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof BinExport2.CallGraph.Edge
                 * @static
                 * @param {BinExport2.CallGraph.Edge} message Edge
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Edge.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.sourceVertexIndex = 0;
                        object.targetVertexIndex = 0;
                    }
                    if (message.sourceVertexIndex != null && message.hasOwnProperty("sourceVertexIndex"))
                        object.sourceVertexIndex = message.sourceVertexIndex;
                    if (message.targetVertexIndex != null && message.hasOwnProperty("targetVertexIndex"))
                        object.targetVertexIndex = message.targetVertexIndex;
                    return object;
                };
    
                /**
                 * Converts this Edge to JSON.
                 * @function toJSON
                 * @memberof BinExport2.CallGraph.Edge
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Edge.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Edge;
            })();
    
            return CallGraph;
        })();
    
        BinExport2.Expression = (function() {
    
            /**
             * Properties of an Expression.
             * @memberof BinExport2
             * @interface IExpression
             * @property {BinExport2.Expression.Type|null} [type] Expression type
             * @property {string|null} [symbol] Expression symbol
             * @property {number|Long|null} [immediate] Expression immediate
             * @property {number|null} [parentIndex] Expression parentIndex
             * @property {boolean|null} [isRelocation] Expression isRelocation
             */
    
            /**
             * Constructs a new Expression.
             * @memberof BinExport2
             * @classdesc Represents an Expression.
             * @implements IExpression
             * @constructor
             * @param {BinExport2.IExpression=} [properties] Properties to set
             */
            function Expression(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Expression type.
             * @member {BinExport2.Expression.Type} type
             * @memberof BinExport2.Expression
             * @instance
             */
            Expression.prototype.type = 2;
    
            /**
             * Expression symbol.
             * @member {string} symbol
             * @memberof BinExport2.Expression
             * @instance
             */
            Expression.prototype.symbol = "";
    
            /**
             * Expression immediate.
             * @member {number|Long} immediate
             * @memberof BinExport2.Expression
             * @instance
             */
            Expression.prototype.immediate = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Expression parentIndex.
             * @member {number} parentIndex
             * @memberof BinExport2.Expression
             * @instance
             */
            Expression.prototype.parentIndex = 0;
    
            /**
             * Expression isRelocation.
             * @member {boolean} isRelocation
             * @memberof BinExport2.Expression
             * @instance
             */
            Expression.prototype.isRelocation = false;
    
            /**
             * Creates a new Expression instance using the specified properties.
             * @function create
             * @memberof BinExport2.Expression
             * @static
             * @param {BinExport2.IExpression=} [properties] Properties to set
             * @returns {BinExport2.Expression} Expression instance
             */
            Expression.create = function create(properties) {
                return new Expression(properties);
            };
    
            /**
             * Encodes the specified Expression message. Does not implicitly {@link BinExport2.Expression.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Expression
             * @static
             * @param {BinExport2.IExpression} message Expression message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Expression.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.symbol != null && message.hasOwnProperty("symbol"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.symbol);
                if (message.immediate != null && message.hasOwnProperty("immediate"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.immediate);
                if (message.parentIndex != null && message.hasOwnProperty("parentIndex"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.parentIndex);
                if (message.isRelocation != null && message.hasOwnProperty("isRelocation"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isRelocation);
                return writer;
            };
    
            /**
             * Encodes the specified Expression message, length delimited. Does not implicitly {@link BinExport2.Expression.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Expression
             * @static
             * @param {BinExport2.IExpression} message Expression message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Expression.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Expression message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Expression
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Expression} Expression
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Expression.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Expression();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.int32();
                        break;
                    case 2:
                        message.symbol = reader.string();
                        break;
                    case 3:
                        message.immediate = reader.uint64();
                        break;
                    case 4:
                        message.parentIndex = reader.int32();
                        break;
                    case 5:
                        message.isRelocation = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Expression message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Expression
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Expression} Expression
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Expression.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Expression message.
             * @function verify
             * @memberof BinExport2.Expression
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Expression.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        break;
                    }
                if (message.symbol != null && message.hasOwnProperty("symbol"))
                    if (!$util.isString(message.symbol))
                        return "symbol: string expected";
                if (message.immediate != null && message.hasOwnProperty("immediate"))
                    if (!$util.isInteger(message.immediate) && !(message.immediate && $util.isInteger(message.immediate.low) && $util.isInteger(message.immediate.high)))
                        return "immediate: integer|Long expected";
                if (message.parentIndex != null && message.hasOwnProperty("parentIndex"))
                    if (!$util.isInteger(message.parentIndex))
                        return "parentIndex: integer expected";
                if (message.isRelocation != null && message.hasOwnProperty("isRelocation"))
                    if (typeof message.isRelocation !== "boolean")
                        return "isRelocation: boolean expected";
                return null;
            };
    
            /**
             * Creates an Expression message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Expression
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Expression} Expression
             */
            Expression.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Expression)
                    return object;
                var message = new $root.BinExport2.Expression();
                switch (object.type) {
                case "SYMBOL":
                case 1:
                    message.type = 1;
                    break;
                case "IMMEDIATE_INT":
                case 2:
                    message.type = 2;
                    break;
                case "IMMEDIATE_FLOAT":
                case 3:
                    message.type = 3;
                    break;
                case "OPERATOR":
                case 4:
                    message.type = 4;
                    break;
                case "REGISTER":
                case 5:
                    message.type = 5;
                    break;
                case "SIZE_PREFIX":
                case 6:
                    message.type = 6;
                    break;
                case "DEREFERENCE":
                case 7:
                    message.type = 7;
                    break;
                }
                if (object.symbol != null)
                    message.symbol = String(object.symbol);
                if (object.immediate != null)
                    if ($util.Long)
                        (message.immediate = $util.Long.fromValue(object.immediate)).unsigned = true;
                    else if (typeof object.immediate === "string")
                        message.immediate = parseInt(object.immediate, 10);
                    else if (typeof object.immediate === "number")
                        message.immediate = object.immediate;
                    else if (typeof object.immediate === "object")
                        message.immediate = new $util.LongBits(object.immediate.low >>> 0, object.immediate.high >>> 0).toNumber(true);
                if (object.parentIndex != null)
                    message.parentIndex = object.parentIndex | 0;
                if (object.isRelocation != null)
                    message.isRelocation = Boolean(object.isRelocation);
                return message;
            };
    
            /**
             * Creates a plain object from an Expression message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Expression
             * @static
             * @param {BinExport2.Expression} message Expression
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Expression.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type = options.enums === String ? "IMMEDIATE_INT" : 2;
                    object.symbol = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.immediate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.immediate = options.longs === String ? "0" : 0;
                    object.parentIndex = 0;
                    object.isRelocation = false;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.BinExport2.Expression.Type[message.type] : message.type;
                if (message.symbol != null && message.hasOwnProperty("symbol"))
                    object.symbol = message.symbol;
                if (message.immediate != null && message.hasOwnProperty("immediate"))
                    if (typeof message.immediate === "number")
                        object.immediate = options.longs === String ? String(message.immediate) : message.immediate;
                    else
                        object.immediate = options.longs === String ? $util.Long.prototype.toString.call(message.immediate) : options.longs === Number ? new $util.LongBits(message.immediate.low >>> 0, message.immediate.high >>> 0).toNumber(true) : message.immediate;
                if (message.parentIndex != null && message.hasOwnProperty("parentIndex"))
                    object.parentIndex = message.parentIndex;
                if (message.isRelocation != null && message.hasOwnProperty("isRelocation"))
                    object.isRelocation = message.isRelocation;
                return object;
            };
    
            /**
             * Converts this Expression to JSON.
             * @function toJSON
             * @memberof BinExport2.Expression
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Expression.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Type enum.
             * @name BinExport2.Expression.Type
             * @enum {string}
             * @property {number} SYMBOL=1 SYMBOL value
             * @property {number} IMMEDIATE_INT=2 IMMEDIATE_INT value
             * @property {number} IMMEDIATE_FLOAT=3 IMMEDIATE_FLOAT value
             * @property {number} OPERATOR=4 OPERATOR value
             * @property {number} REGISTER=5 REGISTER value
             * @property {number} SIZE_PREFIX=6 SIZE_PREFIX value
             * @property {number} DEREFERENCE=7 DEREFERENCE value
             */
            Expression.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "SYMBOL"] = 1;
                values[valuesById[2] = "IMMEDIATE_INT"] = 2;
                values[valuesById[3] = "IMMEDIATE_FLOAT"] = 3;
                values[valuesById[4] = "OPERATOR"] = 4;
                values[valuesById[5] = "REGISTER"] = 5;
                values[valuesById[6] = "SIZE_PREFIX"] = 6;
                values[valuesById[7] = "DEREFERENCE"] = 7;
                return values;
            })();
    
            return Expression;
        })();
    
        BinExport2.Operand = (function() {
    
            /**
             * Properties of an Operand.
             * @memberof BinExport2
             * @interface IOperand
             * @property {Array.<number>|null} [expressionIndex] Operand expressionIndex
             */
    
            /**
             * Constructs a new Operand.
             * @memberof BinExport2
             * @classdesc Represents an Operand.
             * @implements IOperand
             * @constructor
             * @param {BinExport2.IOperand=} [properties] Properties to set
             */
            function Operand(properties) {
                this.expressionIndex = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Operand expressionIndex.
             * @member {Array.<number>} expressionIndex
             * @memberof BinExport2.Operand
             * @instance
             */
            Operand.prototype.expressionIndex = $util.emptyArray;
    
            /**
             * Creates a new Operand instance using the specified properties.
             * @function create
             * @memberof BinExport2.Operand
             * @static
             * @param {BinExport2.IOperand=} [properties] Properties to set
             * @returns {BinExport2.Operand} Operand instance
             */
            Operand.create = function create(properties) {
                return new Operand(properties);
            };
    
            /**
             * Encodes the specified Operand message. Does not implicitly {@link BinExport2.Operand.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Operand
             * @static
             * @param {BinExport2.IOperand} message Operand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Operand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.expressionIndex != null && message.expressionIndex.length)
                    for (var i = 0; i < message.expressionIndex.length; ++i)
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.expressionIndex[i]);
                return writer;
            };
    
            /**
             * Encodes the specified Operand message, length delimited. Does not implicitly {@link BinExport2.Operand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Operand
             * @static
             * @param {BinExport2.IOperand} message Operand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Operand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Operand message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Operand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Operand} Operand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Operand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Operand();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.expressionIndex && message.expressionIndex.length))
                            message.expressionIndex = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.expressionIndex.push(reader.int32());
                        } else
                            message.expressionIndex.push(reader.int32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Operand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Operand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Operand} Operand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Operand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Operand message.
             * @function verify
             * @memberof BinExport2.Operand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Operand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.expressionIndex != null && message.hasOwnProperty("expressionIndex")) {
                    if (!Array.isArray(message.expressionIndex))
                        return "expressionIndex: array expected";
                    for (var i = 0; i < message.expressionIndex.length; ++i)
                        if (!$util.isInteger(message.expressionIndex[i]))
                            return "expressionIndex: integer[] expected";
                }
                return null;
            };
    
            /**
             * Creates an Operand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Operand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Operand} Operand
             */
            Operand.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Operand)
                    return object;
                var message = new $root.BinExport2.Operand();
                if (object.expressionIndex) {
                    if (!Array.isArray(object.expressionIndex))
                        throw TypeError(".BinExport2.Operand.expressionIndex: array expected");
                    message.expressionIndex = [];
                    for (var i = 0; i < object.expressionIndex.length; ++i)
                        message.expressionIndex[i] = object.expressionIndex[i] | 0;
                }
                return message;
            };
    
            /**
             * Creates a plain object from an Operand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Operand
             * @static
             * @param {BinExport2.Operand} message Operand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Operand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.expressionIndex = [];
                if (message.expressionIndex && message.expressionIndex.length) {
                    object.expressionIndex = [];
                    for (var j = 0; j < message.expressionIndex.length; ++j)
                        object.expressionIndex[j] = message.expressionIndex[j];
                }
                return object;
            };
    
            /**
             * Converts this Operand to JSON.
             * @function toJSON
             * @memberof BinExport2.Operand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Operand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Operand;
        })();
    
        BinExport2.Mnemonic = (function() {
    
            /**
             * Properties of a Mnemonic.
             * @memberof BinExport2
             * @interface IMnemonic
             * @property {string|null} [name] Mnemonic name
             */
    
            /**
             * Constructs a new Mnemonic.
             * @memberof BinExport2
             * @classdesc Represents a Mnemonic.
             * @implements IMnemonic
             * @constructor
             * @param {BinExport2.IMnemonic=} [properties] Properties to set
             */
            function Mnemonic(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Mnemonic name.
             * @member {string} name
             * @memberof BinExport2.Mnemonic
             * @instance
             */
            Mnemonic.prototype.name = "";
    
            /**
             * Creates a new Mnemonic instance using the specified properties.
             * @function create
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {BinExport2.IMnemonic=} [properties] Properties to set
             * @returns {BinExport2.Mnemonic} Mnemonic instance
             */
            Mnemonic.create = function create(properties) {
                return new Mnemonic(properties);
            };
    
            /**
             * Encodes the specified Mnemonic message. Does not implicitly {@link BinExport2.Mnemonic.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {BinExport2.IMnemonic} message Mnemonic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Mnemonic.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                return writer;
            };
    
            /**
             * Encodes the specified Mnemonic message, length delimited. Does not implicitly {@link BinExport2.Mnemonic.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {BinExport2.IMnemonic} message Mnemonic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Mnemonic.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Mnemonic message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Mnemonic} Mnemonic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Mnemonic.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Mnemonic();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Mnemonic message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Mnemonic} Mnemonic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Mnemonic.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Mnemonic message.
             * @function verify
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Mnemonic.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };
    
            /**
             * Creates a Mnemonic message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Mnemonic} Mnemonic
             */
            Mnemonic.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Mnemonic)
                    return object;
                var message = new $root.BinExport2.Mnemonic();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };
    
            /**
             * Creates a plain object from a Mnemonic message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Mnemonic
             * @static
             * @param {BinExport2.Mnemonic} message Mnemonic
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Mnemonic.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };
    
            /**
             * Converts this Mnemonic to JSON.
             * @function toJSON
             * @memberof BinExport2.Mnemonic
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Mnemonic.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Mnemonic;
        })();
    
        BinExport2.Instruction = (function() {
    
            /**
             * Properties of an Instruction.
             * @memberof BinExport2
             * @interface IInstruction
             * @property {number|Long|null} [address] Instruction address
             * @property {Array.<number|Long>|null} [callTarget] Instruction callTarget
             * @property {number|null} [mnemonicIndex] Instruction mnemonicIndex
             * @property {Array.<number>|null} [operandIndex] Instruction operandIndex
             * @property {Uint8Array|null} [rawBytes] Instruction rawBytes
             * @property {Array.<number>|null} [commentIndex] Instruction commentIndex
             */
    
            /**
             * Constructs a new Instruction.
             * @memberof BinExport2
             * @classdesc Represents an Instruction.
             * @implements IInstruction
             * @constructor
             * @param {BinExport2.IInstruction=} [properties] Properties to set
             */
            function Instruction(properties) {
                this.callTarget = [];
                this.operandIndex = [];
                this.commentIndex = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Instruction address.
             * @member {number|Long} address
             * @memberof BinExport2.Instruction
             * @instance
             */
            Instruction.prototype.address = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Instruction callTarget.
             * @member {Array.<number|Long>} callTarget
             * @memberof BinExport2.Instruction
             * @instance
             */
            Instruction.prototype.callTarget = $util.emptyArray;
    
            /**
             * Instruction mnemonicIndex.
             * @member {number} mnemonicIndex
             * @memberof BinExport2.Instruction
             * @instance
             */
            Instruction.prototype.mnemonicIndex = 0;
    
            /**
             * Instruction operandIndex.
             * @member {Array.<number>} operandIndex
             * @memberof BinExport2.Instruction
             * @instance
             */
            Instruction.prototype.operandIndex = $util.emptyArray;
    
            /**
             * Instruction rawBytes.
             * @member {Uint8Array} rawBytes
             * @memberof BinExport2.Instruction
             * @instance
             */
            Instruction.prototype.rawBytes = $util.newBuffer([]);
    
            /**
             * Instruction commentIndex.
             * @member {Array.<number>} commentIndex
             * @memberof BinExport2.Instruction
             * @instance
             */
            Instruction.prototype.commentIndex = $util.emptyArray;
    
            /**
             * Creates a new Instruction instance using the specified properties.
             * @function create
             * @memberof BinExport2.Instruction
             * @static
             * @param {BinExport2.IInstruction=} [properties] Properties to set
             * @returns {BinExport2.Instruction} Instruction instance
             */
            Instruction.create = function create(properties) {
                return new Instruction(properties);
            };
    
            /**
             * Encodes the specified Instruction message. Does not implicitly {@link BinExport2.Instruction.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Instruction
             * @static
             * @param {BinExport2.IInstruction} message Instruction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Instruction.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.address != null && message.hasOwnProperty("address"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.address);
                if (message.callTarget != null && message.callTarget.length)
                    for (var i = 0; i < message.callTarget.length; ++i)
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.callTarget[i]);
                if (message.mnemonicIndex != null && message.hasOwnProperty("mnemonicIndex"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mnemonicIndex);
                if (message.operandIndex != null && message.operandIndex.length)
                    for (var i = 0; i < message.operandIndex.length; ++i)
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.operandIndex[i]);
                if (message.rawBytes != null && message.hasOwnProperty("rawBytes"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.rawBytes);
                if (message.commentIndex != null && message.commentIndex.length)
                    for (var i = 0; i < message.commentIndex.length; ++i)
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.commentIndex[i]);
                return writer;
            };
    
            /**
             * Encodes the specified Instruction message, length delimited. Does not implicitly {@link BinExport2.Instruction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Instruction
             * @static
             * @param {BinExport2.IInstruction} message Instruction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Instruction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Instruction message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Instruction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Instruction} Instruction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Instruction.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Instruction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.address = reader.uint64();
                        break;
                    case 2:
                        if (!(message.callTarget && message.callTarget.length))
                            message.callTarget = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.callTarget.push(reader.uint64());
                        } else
                            message.callTarget.push(reader.uint64());
                        break;
                    case 3:
                        message.mnemonicIndex = reader.int32();
                        break;
                    case 4:
                        if (!(message.operandIndex && message.operandIndex.length))
                            message.operandIndex = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.operandIndex.push(reader.int32());
                        } else
                            message.operandIndex.push(reader.int32());
                        break;
                    case 5:
                        message.rawBytes = reader.bytes();
                        break;
                    case 6:
                        if (!(message.commentIndex && message.commentIndex.length))
                            message.commentIndex = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.commentIndex.push(reader.int32());
                        } else
                            message.commentIndex.push(reader.int32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Instruction message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Instruction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Instruction} Instruction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Instruction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Instruction message.
             * @function verify
             * @memberof BinExport2.Instruction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Instruction.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.address != null && message.hasOwnProperty("address"))
                    if (!$util.isInteger(message.address) && !(message.address && $util.isInteger(message.address.low) && $util.isInteger(message.address.high)))
                        return "address: integer|Long expected";
                if (message.callTarget != null && message.hasOwnProperty("callTarget")) {
                    if (!Array.isArray(message.callTarget))
                        return "callTarget: array expected";
                    for (var i = 0; i < message.callTarget.length; ++i)
                        if (!$util.isInteger(message.callTarget[i]) && !(message.callTarget[i] && $util.isInteger(message.callTarget[i].low) && $util.isInteger(message.callTarget[i].high)))
                            return "callTarget: integer|Long[] expected";
                }
                if (message.mnemonicIndex != null && message.hasOwnProperty("mnemonicIndex"))
                    if (!$util.isInteger(message.mnemonicIndex))
                        return "mnemonicIndex: integer expected";
                if (message.operandIndex != null && message.hasOwnProperty("operandIndex")) {
                    if (!Array.isArray(message.operandIndex))
                        return "operandIndex: array expected";
                    for (var i = 0; i < message.operandIndex.length; ++i)
                        if (!$util.isInteger(message.operandIndex[i]))
                            return "operandIndex: integer[] expected";
                }
                if (message.rawBytes != null && message.hasOwnProperty("rawBytes"))
                    if (!(message.rawBytes && typeof message.rawBytes.length === "number" || $util.isString(message.rawBytes)))
                        return "rawBytes: buffer expected";
                if (message.commentIndex != null && message.hasOwnProperty("commentIndex")) {
                    if (!Array.isArray(message.commentIndex))
                        return "commentIndex: array expected";
                    for (var i = 0; i < message.commentIndex.length; ++i)
                        if (!$util.isInteger(message.commentIndex[i]))
                            return "commentIndex: integer[] expected";
                }
                return null;
            };
    
            /**
             * Creates an Instruction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Instruction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Instruction} Instruction
             */
            Instruction.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Instruction)
                    return object;
                var message = new $root.BinExport2.Instruction();
                if (object.address != null)
                    if ($util.Long)
                        (message.address = $util.Long.fromValue(object.address)).unsigned = true;
                    else if (typeof object.address === "string")
                        message.address = parseInt(object.address, 10);
                    else if (typeof object.address === "number")
                        message.address = object.address;
                    else if (typeof object.address === "object")
                        message.address = new $util.LongBits(object.address.low >>> 0, object.address.high >>> 0).toNumber(true);
                if (object.callTarget) {
                    if (!Array.isArray(object.callTarget))
                        throw TypeError(".BinExport2.Instruction.callTarget: array expected");
                    message.callTarget = [];
                    for (var i = 0; i < object.callTarget.length; ++i)
                        if ($util.Long)
                            (message.callTarget[i] = $util.Long.fromValue(object.callTarget[i])).unsigned = true;
                        else if (typeof object.callTarget[i] === "string")
                            message.callTarget[i] = parseInt(object.callTarget[i], 10);
                        else if (typeof object.callTarget[i] === "number")
                            message.callTarget[i] = object.callTarget[i];
                        else if (typeof object.callTarget[i] === "object")
                            message.callTarget[i] = new $util.LongBits(object.callTarget[i].low >>> 0, object.callTarget[i].high >>> 0).toNumber(true);
                }
                if (object.mnemonicIndex != null)
                    message.mnemonicIndex = object.mnemonicIndex | 0;
                if (object.operandIndex) {
                    if (!Array.isArray(object.operandIndex))
                        throw TypeError(".BinExport2.Instruction.operandIndex: array expected");
                    message.operandIndex = [];
                    for (var i = 0; i < object.operandIndex.length; ++i)
                        message.operandIndex[i] = object.operandIndex[i] | 0;
                }
                if (object.rawBytes != null)
                    if (typeof object.rawBytes === "string")
                        $util.base64.decode(object.rawBytes, message.rawBytes = $util.newBuffer($util.base64.length(object.rawBytes)), 0);
                    else if (object.rawBytes.length)
                        message.rawBytes = object.rawBytes;
                if (object.commentIndex) {
                    if (!Array.isArray(object.commentIndex))
                        throw TypeError(".BinExport2.Instruction.commentIndex: array expected");
                    message.commentIndex = [];
                    for (var i = 0; i < object.commentIndex.length; ++i)
                        message.commentIndex[i] = object.commentIndex[i] | 0;
                }
                return message;
            };
    
            /**
             * Creates a plain object from an Instruction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Instruction
             * @static
             * @param {BinExport2.Instruction} message Instruction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Instruction.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.callTarget = [];
                    object.operandIndex = [];
                    object.commentIndex = [];
                }
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.address = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.address = options.longs === String ? "0" : 0;
                    object.mnemonicIndex = 0;
                    if (options.bytes === String)
                        object.rawBytes = "";
                    else {
                        object.rawBytes = [];
                        if (options.bytes !== Array)
                            object.rawBytes = $util.newBuffer(object.rawBytes);
                    }
                }
                if (message.address != null && message.hasOwnProperty("address"))
                    if (typeof message.address === "number")
                        object.address = options.longs === String ? String(message.address) : message.address;
                    else
                        object.address = options.longs === String ? $util.Long.prototype.toString.call(message.address) : options.longs === Number ? new $util.LongBits(message.address.low >>> 0, message.address.high >>> 0).toNumber(true) : message.address;
                if (message.callTarget && message.callTarget.length) {
                    object.callTarget = [];
                    for (var j = 0; j < message.callTarget.length; ++j)
                        if (typeof message.callTarget[j] === "number")
                            object.callTarget[j] = options.longs === String ? String(message.callTarget[j]) : message.callTarget[j];
                        else
                            object.callTarget[j] = options.longs === String ? $util.Long.prototype.toString.call(message.callTarget[j]) : options.longs === Number ? new $util.LongBits(message.callTarget[j].low >>> 0, message.callTarget[j].high >>> 0).toNumber(true) : message.callTarget[j];
                }
                if (message.mnemonicIndex != null && message.hasOwnProperty("mnemonicIndex"))
                    object.mnemonicIndex = message.mnemonicIndex;
                if (message.operandIndex && message.operandIndex.length) {
                    object.operandIndex = [];
                    for (var j = 0; j < message.operandIndex.length; ++j)
                        object.operandIndex[j] = message.operandIndex[j];
                }
                if (message.rawBytes != null && message.hasOwnProperty("rawBytes"))
                    object.rawBytes = options.bytes === String ? $util.base64.encode(message.rawBytes, 0, message.rawBytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.rawBytes) : message.rawBytes;
                if (message.commentIndex && message.commentIndex.length) {
                    object.commentIndex = [];
                    for (var j = 0; j < message.commentIndex.length; ++j)
                        object.commentIndex[j] = message.commentIndex[j];
                }
                return object;
            };
    
            /**
             * Converts this Instruction to JSON.
             * @function toJSON
             * @memberof BinExport2.Instruction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Instruction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Instruction;
        })();
    
        BinExport2.BasicBlock = (function() {
    
            /**
             * Properties of a BasicBlock.
             * @memberof BinExport2
             * @interface IBasicBlock
             * @property {Array.<BinExport2.BasicBlock.IIndexRange>|null} [instructionIndex] BasicBlock instructionIndex
             */
    
            /**
             * Constructs a new BasicBlock.
             * @memberof BinExport2
             * @classdesc Represents a BasicBlock.
             * @implements IBasicBlock
             * @constructor
             * @param {BinExport2.IBasicBlock=} [properties] Properties to set
             */
            function BasicBlock(properties) {
                this.instructionIndex = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BasicBlock instructionIndex.
             * @member {Array.<BinExport2.BasicBlock.IIndexRange>} instructionIndex
             * @memberof BinExport2.BasicBlock
             * @instance
             */
            BasicBlock.prototype.instructionIndex = $util.emptyArray;
    
            /**
             * Creates a new BasicBlock instance using the specified properties.
             * @function create
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {BinExport2.IBasicBlock=} [properties] Properties to set
             * @returns {BinExport2.BasicBlock} BasicBlock instance
             */
            BasicBlock.create = function create(properties) {
                return new BasicBlock(properties);
            };
    
            /**
             * Encodes the specified BasicBlock message. Does not implicitly {@link BinExport2.BasicBlock.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {BinExport2.IBasicBlock} message BasicBlock message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BasicBlock.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.instructionIndex != null && message.instructionIndex.length)
                    for (var i = 0; i < message.instructionIndex.length; ++i)
                        $root.BinExport2.BasicBlock.IndexRange.encode(message.instructionIndex[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified BasicBlock message, length delimited. Does not implicitly {@link BinExport2.BasicBlock.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {BinExport2.IBasicBlock} message BasicBlock message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BasicBlock.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BasicBlock message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.BasicBlock} BasicBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BasicBlock.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.BasicBlock();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.instructionIndex && message.instructionIndex.length))
                            message.instructionIndex = [];
                        message.instructionIndex.push($root.BinExport2.BasicBlock.IndexRange.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BasicBlock message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.BasicBlock} BasicBlock
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BasicBlock.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BasicBlock message.
             * @function verify
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BasicBlock.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex")) {
                    if (!Array.isArray(message.instructionIndex))
                        return "instructionIndex: array expected";
                    for (var i = 0; i < message.instructionIndex.length; ++i) {
                        var error = $root.BinExport2.BasicBlock.IndexRange.verify(message.instructionIndex[i]);
                        if (error)
                            return "instructionIndex." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a BasicBlock message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.BasicBlock} BasicBlock
             */
            BasicBlock.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.BasicBlock)
                    return object;
                var message = new $root.BinExport2.BasicBlock();
                if (object.instructionIndex) {
                    if (!Array.isArray(object.instructionIndex))
                        throw TypeError(".BinExport2.BasicBlock.instructionIndex: array expected");
                    message.instructionIndex = [];
                    for (var i = 0; i < object.instructionIndex.length; ++i) {
                        if (typeof object.instructionIndex[i] !== "object")
                            throw TypeError(".BinExport2.BasicBlock.instructionIndex: object expected");
                        message.instructionIndex[i] = $root.BinExport2.BasicBlock.IndexRange.fromObject(object.instructionIndex[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a BasicBlock message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.BasicBlock
             * @static
             * @param {BinExport2.BasicBlock} message BasicBlock
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BasicBlock.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.instructionIndex = [];
                if (message.instructionIndex && message.instructionIndex.length) {
                    object.instructionIndex = [];
                    for (var j = 0; j < message.instructionIndex.length; ++j)
                        object.instructionIndex[j] = $root.BinExport2.BasicBlock.IndexRange.toObject(message.instructionIndex[j], options);
                }
                return object;
            };
    
            /**
             * Converts this BasicBlock to JSON.
             * @function toJSON
             * @memberof BinExport2.BasicBlock
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BasicBlock.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            BasicBlock.IndexRange = (function() {
    
                /**
                 * Properties of an IndexRange.
                 * @memberof BinExport2.BasicBlock
                 * @interface IIndexRange
                 * @property {number|null} [beginIndex] IndexRange beginIndex
                 * @property {number|null} [endIndex] IndexRange endIndex
                 */
    
                /**
                 * Constructs a new IndexRange.
                 * @memberof BinExport2.BasicBlock
                 * @classdesc Represents an IndexRange.
                 * @implements IIndexRange
                 * @constructor
                 * @param {BinExport2.BasicBlock.IIndexRange=} [properties] Properties to set
                 */
                function IndexRange(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * IndexRange beginIndex.
                 * @member {number} beginIndex
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @instance
                 */
                IndexRange.prototype.beginIndex = 0;
    
                /**
                 * IndexRange endIndex.
                 * @member {number} endIndex
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @instance
                 */
                IndexRange.prototype.endIndex = 0;
    
                /**
                 * Creates a new IndexRange instance using the specified properties.
                 * @function create
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {BinExport2.BasicBlock.IIndexRange=} [properties] Properties to set
                 * @returns {BinExport2.BasicBlock.IndexRange} IndexRange instance
                 */
                IndexRange.create = function create(properties) {
                    return new IndexRange(properties);
                };
    
                /**
                 * Encodes the specified IndexRange message. Does not implicitly {@link BinExport2.BasicBlock.IndexRange.verify|verify} messages.
                 * @function encode
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {BinExport2.BasicBlock.IIndexRange} message IndexRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IndexRange.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.beginIndex != null && message.hasOwnProperty("beginIndex"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.beginIndex);
                    if (message.endIndex != null && message.hasOwnProperty("endIndex"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.endIndex);
                    return writer;
                };
    
                /**
                 * Encodes the specified IndexRange message, length delimited. Does not implicitly {@link BinExport2.BasicBlock.IndexRange.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {BinExport2.BasicBlock.IIndexRange} message IndexRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IndexRange.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an IndexRange message from the specified reader or buffer.
                 * @function decode
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {BinExport2.BasicBlock.IndexRange} IndexRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IndexRange.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.BasicBlock.IndexRange();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.beginIndex = reader.int32();
                            break;
                        case 2:
                            message.endIndex = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an IndexRange message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {BinExport2.BasicBlock.IndexRange} IndexRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IndexRange.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an IndexRange message.
                 * @function verify
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                IndexRange.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.beginIndex != null && message.hasOwnProperty("beginIndex"))
                        if (!$util.isInteger(message.beginIndex))
                            return "beginIndex: integer expected";
                    if (message.endIndex != null && message.hasOwnProperty("endIndex"))
                        if (!$util.isInteger(message.endIndex))
                            return "endIndex: integer expected";
                    return null;
                };
    
                /**
                 * Creates an IndexRange message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {BinExport2.BasicBlock.IndexRange} IndexRange
                 */
                IndexRange.fromObject = function fromObject(object) {
                    if (object instanceof $root.BinExport2.BasicBlock.IndexRange)
                        return object;
                    var message = new $root.BinExport2.BasicBlock.IndexRange();
                    if (object.beginIndex != null)
                        message.beginIndex = object.beginIndex | 0;
                    if (object.endIndex != null)
                        message.endIndex = object.endIndex | 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from an IndexRange message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @static
                 * @param {BinExport2.BasicBlock.IndexRange} message IndexRange
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                IndexRange.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.beginIndex = 0;
                        object.endIndex = 0;
                    }
                    if (message.beginIndex != null && message.hasOwnProperty("beginIndex"))
                        object.beginIndex = message.beginIndex;
                    if (message.endIndex != null && message.hasOwnProperty("endIndex"))
                        object.endIndex = message.endIndex;
                    return object;
                };
    
                /**
                 * Converts this IndexRange to JSON.
                 * @function toJSON
                 * @memberof BinExport2.BasicBlock.IndexRange
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                IndexRange.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return IndexRange;
            })();
    
            return BasicBlock;
        })();
    
        BinExport2.FlowGraph = (function() {
    
            /**
             * Properties of a FlowGraph.
             * @memberof BinExport2
             * @interface IFlowGraph
             * @property {Array.<number>|null} [basicBlockIndex] FlowGraph basicBlockIndex
             * @property {number|null} [entryBasicBlockIndex] FlowGraph entryBasicBlockIndex
             * @property {Array.<BinExport2.FlowGraph.IEdge>|null} [edge] FlowGraph edge
             */
    
            /**
             * Constructs a new FlowGraph.
             * @memberof BinExport2
             * @classdesc Represents a FlowGraph.
             * @implements IFlowGraph
             * @constructor
             * @param {BinExport2.IFlowGraph=} [properties] Properties to set
             */
            function FlowGraph(properties) {
                this.basicBlockIndex = [];
                this.edge = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * FlowGraph basicBlockIndex.
             * @member {Array.<number>} basicBlockIndex
             * @memberof BinExport2.FlowGraph
             * @instance
             */
            FlowGraph.prototype.basicBlockIndex = $util.emptyArray;
    
            /**
             * FlowGraph entryBasicBlockIndex.
             * @member {number} entryBasicBlockIndex
             * @memberof BinExport2.FlowGraph
             * @instance
             */
            FlowGraph.prototype.entryBasicBlockIndex = 0;
    
            /**
             * FlowGraph edge.
             * @member {Array.<BinExport2.FlowGraph.IEdge>} edge
             * @memberof BinExport2.FlowGraph
             * @instance
             */
            FlowGraph.prototype.edge = $util.emptyArray;
    
            /**
             * Creates a new FlowGraph instance using the specified properties.
             * @function create
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {BinExport2.IFlowGraph=} [properties] Properties to set
             * @returns {BinExport2.FlowGraph} FlowGraph instance
             */
            FlowGraph.create = function create(properties) {
                return new FlowGraph(properties);
            };
    
            /**
             * Encodes the specified FlowGraph message. Does not implicitly {@link BinExport2.FlowGraph.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {BinExport2.IFlowGraph} message FlowGraph message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FlowGraph.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.basicBlockIndex != null && message.basicBlockIndex.length)
                    for (var i = 0; i < message.basicBlockIndex.length; ++i)
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.basicBlockIndex[i]);
                if (message.edge != null && message.edge.length)
                    for (var i = 0; i < message.edge.length; ++i)
                        $root.BinExport2.FlowGraph.Edge.encode(message.edge[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.entryBasicBlockIndex != null && message.hasOwnProperty("entryBasicBlockIndex"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.entryBasicBlockIndex);
                return writer;
            };
    
            /**
             * Encodes the specified FlowGraph message, length delimited. Does not implicitly {@link BinExport2.FlowGraph.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {BinExport2.IFlowGraph} message FlowGraph message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FlowGraph.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a FlowGraph message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.FlowGraph} FlowGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FlowGraph.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.FlowGraph();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.basicBlockIndex && message.basicBlockIndex.length))
                            message.basicBlockIndex = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.basicBlockIndex.push(reader.int32());
                        } else
                            message.basicBlockIndex.push(reader.int32());
                        break;
                    case 3:
                        message.entryBasicBlockIndex = reader.int32();
                        break;
                    case 2:
                        if (!(message.edge && message.edge.length))
                            message.edge = [];
                        message.edge.push($root.BinExport2.FlowGraph.Edge.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a FlowGraph message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.FlowGraph} FlowGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FlowGraph.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a FlowGraph message.
             * @function verify
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FlowGraph.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.basicBlockIndex != null && message.hasOwnProperty("basicBlockIndex")) {
                    if (!Array.isArray(message.basicBlockIndex))
                        return "basicBlockIndex: array expected";
                    for (var i = 0; i < message.basicBlockIndex.length; ++i)
                        if (!$util.isInteger(message.basicBlockIndex[i]))
                            return "basicBlockIndex: integer[] expected";
                }
                if (message.entryBasicBlockIndex != null && message.hasOwnProperty("entryBasicBlockIndex"))
                    if (!$util.isInteger(message.entryBasicBlockIndex))
                        return "entryBasicBlockIndex: integer expected";
                if (message.edge != null && message.hasOwnProperty("edge")) {
                    if (!Array.isArray(message.edge))
                        return "edge: array expected";
                    for (var i = 0; i < message.edge.length; ++i) {
                        var error = $root.BinExport2.FlowGraph.Edge.verify(message.edge[i]);
                        if (error)
                            return "edge." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a FlowGraph message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.FlowGraph} FlowGraph
             */
            FlowGraph.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.FlowGraph)
                    return object;
                var message = new $root.BinExport2.FlowGraph();
                if (object.basicBlockIndex) {
                    if (!Array.isArray(object.basicBlockIndex))
                        throw TypeError(".BinExport2.FlowGraph.basicBlockIndex: array expected");
                    message.basicBlockIndex = [];
                    for (var i = 0; i < object.basicBlockIndex.length; ++i)
                        message.basicBlockIndex[i] = object.basicBlockIndex[i] | 0;
                }
                if (object.entryBasicBlockIndex != null)
                    message.entryBasicBlockIndex = object.entryBasicBlockIndex | 0;
                if (object.edge) {
                    if (!Array.isArray(object.edge))
                        throw TypeError(".BinExport2.FlowGraph.edge: array expected");
                    message.edge = [];
                    for (var i = 0; i < object.edge.length; ++i) {
                        if (typeof object.edge[i] !== "object")
                            throw TypeError(".BinExport2.FlowGraph.edge: object expected");
                        message.edge[i] = $root.BinExport2.FlowGraph.Edge.fromObject(object.edge[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FlowGraph message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.FlowGraph
             * @static
             * @param {BinExport2.FlowGraph} message FlowGraph
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FlowGraph.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.basicBlockIndex = [];
                    object.edge = [];
                }
                if (options.defaults)
                    object.entryBasicBlockIndex = 0;
                if (message.basicBlockIndex && message.basicBlockIndex.length) {
                    object.basicBlockIndex = [];
                    for (var j = 0; j < message.basicBlockIndex.length; ++j)
                        object.basicBlockIndex[j] = message.basicBlockIndex[j];
                }
                if (message.edge && message.edge.length) {
                    object.edge = [];
                    for (var j = 0; j < message.edge.length; ++j)
                        object.edge[j] = $root.BinExport2.FlowGraph.Edge.toObject(message.edge[j], options);
                }
                if (message.entryBasicBlockIndex != null && message.hasOwnProperty("entryBasicBlockIndex"))
                    object.entryBasicBlockIndex = message.entryBasicBlockIndex;
                return object;
            };
    
            /**
             * Converts this FlowGraph to JSON.
             * @function toJSON
             * @memberof BinExport2.FlowGraph
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FlowGraph.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            FlowGraph.Edge = (function() {
    
                /**
                 * Properties of an Edge.
                 * @memberof BinExport2.FlowGraph
                 * @interface IEdge
                 * @property {number|null} [sourceBasicBlockIndex] Edge sourceBasicBlockIndex
                 * @property {number|null} [targetBasicBlockIndex] Edge targetBasicBlockIndex
                 * @property {BinExport2.FlowGraph.Edge.Type|null} [type] Edge type
                 * @property {boolean|null} [isBackEdge] Edge isBackEdge
                 */
    
                /**
                 * Constructs a new Edge.
                 * @memberof BinExport2.FlowGraph
                 * @classdesc Represents an Edge.
                 * @implements IEdge
                 * @constructor
                 * @param {BinExport2.FlowGraph.IEdge=} [properties] Properties to set
                 */
                function Edge(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Edge sourceBasicBlockIndex.
                 * @member {number} sourceBasicBlockIndex
                 * @memberof BinExport2.FlowGraph.Edge
                 * @instance
                 */
                Edge.prototype.sourceBasicBlockIndex = 0;
    
                /**
                 * Edge targetBasicBlockIndex.
                 * @member {number} targetBasicBlockIndex
                 * @memberof BinExport2.FlowGraph.Edge
                 * @instance
                 */
                Edge.prototype.targetBasicBlockIndex = 0;
    
                /**
                 * Edge type.
                 * @member {BinExport2.FlowGraph.Edge.Type} type
                 * @memberof BinExport2.FlowGraph.Edge
                 * @instance
                 */
                Edge.prototype.type = 3;
    
                /**
                 * Edge isBackEdge.
                 * @member {boolean} isBackEdge
                 * @memberof BinExport2.FlowGraph.Edge
                 * @instance
                 */
                Edge.prototype.isBackEdge = false;
    
                /**
                 * Creates a new Edge instance using the specified properties.
                 * @function create
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {BinExport2.FlowGraph.IEdge=} [properties] Properties to set
                 * @returns {BinExport2.FlowGraph.Edge} Edge instance
                 */
                Edge.create = function create(properties) {
                    return new Edge(properties);
                };
    
                /**
                 * Encodes the specified Edge message. Does not implicitly {@link BinExport2.FlowGraph.Edge.verify|verify} messages.
                 * @function encode
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {BinExport2.FlowGraph.IEdge} message Edge message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Edge.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.sourceBasicBlockIndex != null && message.hasOwnProperty("sourceBasicBlockIndex"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sourceBasicBlockIndex);
                    if (message.targetBasicBlockIndex != null && message.hasOwnProperty("targetBasicBlockIndex"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.targetBasicBlockIndex);
                    if (message.type != null && message.hasOwnProperty("type"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
                    if (message.isBackEdge != null && message.hasOwnProperty("isBackEdge"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isBackEdge);
                    return writer;
                };
    
                /**
                 * Encodes the specified Edge message, length delimited. Does not implicitly {@link BinExport2.FlowGraph.Edge.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {BinExport2.FlowGraph.IEdge} message Edge message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Edge.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Edge message from the specified reader or buffer.
                 * @function decode
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {BinExport2.FlowGraph.Edge} Edge
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Edge.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.FlowGraph.Edge();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.sourceBasicBlockIndex = reader.int32();
                            break;
                        case 2:
                            message.targetBasicBlockIndex = reader.int32();
                            break;
                        case 3:
                            message.type = reader.int32();
                            break;
                        case 4:
                            message.isBackEdge = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Edge message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {BinExport2.FlowGraph.Edge} Edge
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Edge.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Edge message.
                 * @function verify
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Edge.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.sourceBasicBlockIndex != null && message.hasOwnProperty("sourceBasicBlockIndex"))
                        if (!$util.isInteger(message.sourceBasicBlockIndex))
                            return "sourceBasicBlockIndex: integer expected";
                    if (message.targetBasicBlockIndex != null && message.hasOwnProperty("targetBasicBlockIndex"))
                        if (!$util.isInteger(message.targetBasicBlockIndex))
                            return "targetBasicBlockIndex: integer expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    if (message.isBackEdge != null && message.hasOwnProperty("isBackEdge"))
                        if (typeof message.isBackEdge !== "boolean")
                            return "isBackEdge: boolean expected";
                    return null;
                };
    
                /**
                 * Creates an Edge message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {BinExport2.FlowGraph.Edge} Edge
                 */
                Edge.fromObject = function fromObject(object) {
                    if (object instanceof $root.BinExport2.FlowGraph.Edge)
                        return object;
                    var message = new $root.BinExport2.FlowGraph.Edge();
                    if (object.sourceBasicBlockIndex != null)
                        message.sourceBasicBlockIndex = object.sourceBasicBlockIndex | 0;
                    if (object.targetBasicBlockIndex != null)
                        message.targetBasicBlockIndex = object.targetBasicBlockIndex | 0;
                    switch (object.type) {
                    case "CONDITION_TRUE":
                    case 1:
                        message.type = 1;
                        break;
                    case "CONDITION_FALSE":
                    case 2:
                        message.type = 2;
                        break;
                    case "UNCONDITIONAL":
                    case 3:
                        message.type = 3;
                        break;
                    case "SWITCH":
                    case 4:
                        message.type = 4;
                        break;
                    }
                    if (object.isBackEdge != null)
                        message.isBackEdge = Boolean(object.isBackEdge);
                    return message;
                };
    
                /**
                 * Creates a plain object from an Edge message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof BinExport2.FlowGraph.Edge
                 * @static
                 * @param {BinExport2.FlowGraph.Edge} message Edge
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Edge.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.sourceBasicBlockIndex = 0;
                        object.targetBasicBlockIndex = 0;
                        object.type = options.enums === String ? "UNCONDITIONAL" : 3;
                        object.isBackEdge = false;
                    }
                    if (message.sourceBasicBlockIndex != null && message.hasOwnProperty("sourceBasicBlockIndex"))
                        object.sourceBasicBlockIndex = message.sourceBasicBlockIndex;
                    if (message.targetBasicBlockIndex != null && message.hasOwnProperty("targetBasicBlockIndex"))
                        object.targetBasicBlockIndex = message.targetBasicBlockIndex;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.BinExport2.FlowGraph.Edge.Type[message.type] : message.type;
                    if (message.isBackEdge != null && message.hasOwnProperty("isBackEdge"))
                        object.isBackEdge = message.isBackEdge;
                    return object;
                };
    
                /**
                 * Converts this Edge to JSON.
                 * @function toJSON
                 * @memberof BinExport2.FlowGraph.Edge
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Edge.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Type enum.
                 * @name BinExport2.FlowGraph.Edge.Type
                 * @enum {string}
                 * @property {number} CONDITION_TRUE=1 CONDITION_TRUE value
                 * @property {number} CONDITION_FALSE=2 CONDITION_FALSE value
                 * @property {number} UNCONDITIONAL=3 UNCONDITIONAL value
                 * @property {number} SWITCH=4 SWITCH value
                 */
                Edge.Type = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[1] = "CONDITION_TRUE"] = 1;
                    values[valuesById[2] = "CONDITION_FALSE"] = 2;
                    values[valuesById[3] = "UNCONDITIONAL"] = 3;
                    values[valuesById[4] = "SWITCH"] = 4;
                    return values;
                })();
    
                return Edge;
            })();
    
            return FlowGraph;
        })();
    
        BinExport2.Reference = (function() {
    
            /**
             * Properties of a Reference.
             * @memberof BinExport2
             * @interface IReference
             * @property {number|null} [instructionIndex] Reference instructionIndex
             * @property {number|null} [instructionOperandIndex] Reference instructionOperandIndex
             * @property {number|null} [operandExpressionIndex] Reference operandExpressionIndex
             * @property {number|null} [stringTableIndex] Reference stringTableIndex
             */
    
            /**
             * Constructs a new Reference.
             * @memberof BinExport2
             * @classdesc Represents a Reference.
             * @implements IReference
             * @constructor
             * @param {BinExport2.IReference=} [properties] Properties to set
             */
            function Reference(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Reference instructionIndex.
             * @member {number} instructionIndex
             * @memberof BinExport2.Reference
             * @instance
             */
            Reference.prototype.instructionIndex = 0;
    
            /**
             * Reference instructionOperandIndex.
             * @member {number} instructionOperandIndex
             * @memberof BinExport2.Reference
             * @instance
             */
            Reference.prototype.instructionOperandIndex = 0;
    
            /**
             * Reference operandExpressionIndex.
             * @member {number} operandExpressionIndex
             * @memberof BinExport2.Reference
             * @instance
             */
            Reference.prototype.operandExpressionIndex = 0;
    
            /**
             * Reference stringTableIndex.
             * @member {number} stringTableIndex
             * @memberof BinExport2.Reference
             * @instance
             */
            Reference.prototype.stringTableIndex = 0;
    
            /**
             * Creates a new Reference instance using the specified properties.
             * @function create
             * @memberof BinExport2.Reference
             * @static
             * @param {BinExport2.IReference=} [properties] Properties to set
             * @returns {BinExport2.Reference} Reference instance
             */
            Reference.create = function create(properties) {
                return new Reference(properties);
            };
    
            /**
             * Encodes the specified Reference message. Does not implicitly {@link BinExport2.Reference.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Reference
             * @static
             * @param {BinExport2.IReference} message Reference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Reference.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.instructionIndex);
                if (message.instructionOperandIndex != null && message.hasOwnProperty("instructionOperandIndex"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.instructionOperandIndex);
                if (message.operandExpressionIndex != null && message.hasOwnProperty("operandExpressionIndex"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.operandExpressionIndex);
                if (message.stringTableIndex != null && message.hasOwnProperty("stringTableIndex"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.stringTableIndex);
                return writer;
            };
    
            /**
             * Encodes the specified Reference message, length delimited. Does not implicitly {@link BinExport2.Reference.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Reference
             * @static
             * @param {BinExport2.IReference} message Reference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Reference.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Reference message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Reference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Reference} Reference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Reference.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Reference();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.instructionIndex = reader.int32();
                        break;
                    case 2:
                        message.instructionOperandIndex = reader.int32();
                        break;
                    case 3:
                        message.operandExpressionIndex = reader.int32();
                        break;
                    case 4:
                        message.stringTableIndex = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Reference message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Reference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Reference} Reference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Reference.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Reference message.
             * @function verify
             * @memberof BinExport2.Reference
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Reference.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    if (!$util.isInteger(message.instructionIndex))
                        return "instructionIndex: integer expected";
                if (message.instructionOperandIndex != null && message.hasOwnProperty("instructionOperandIndex"))
                    if (!$util.isInteger(message.instructionOperandIndex))
                        return "instructionOperandIndex: integer expected";
                if (message.operandExpressionIndex != null && message.hasOwnProperty("operandExpressionIndex"))
                    if (!$util.isInteger(message.operandExpressionIndex))
                        return "operandExpressionIndex: integer expected";
                if (message.stringTableIndex != null && message.hasOwnProperty("stringTableIndex"))
                    if (!$util.isInteger(message.stringTableIndex))
                        return "stringTableIndex: integer expected";
                return null;
            };
    
            /**
             * Creates a Reference message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Reference
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Reference} Reference
             */
            Reference.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Reference)
                    return object;
                var message = new $root.BinExport2.Reference();
                if (object.instructionIndex != null)
                    message.instructionIndex = object.instructionIndex | 0;
                if (object.instructionOperandIndex != null)
                    message.instructionOperandIndex = object.instructionOperandIndex | 0;
                if (object.operandExpressionIndex != null)
                    message.operandExpressionIndex = object.operandExpressionIndex | 0;
                if (object.stringTableIndex != null)
                    message.stringTableIndex = object.stringTableIndex | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Reference message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Reference
             * @static
             * @param {BinExport2.Reference} message Reference
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Reference.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.instructionIndex = 0;
                    object.instructionOperandIndex = 0;
                    object.operandExpressionIndex = 0;
                    object.stringTableIndex = 0;
                }
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    object.instructionIndex = message.instructionIndex;
                if (message.instructionOperandIndex != null && message.hasOwnProperty("instructionOperandIndex"))
                    object.instructionOperandIndex = message.instructionOperandIndex;
                if (message.operandExpressionIndex != null && message.hasOwnProperty("operandExpressionIndex"))
                    object.operandExpressionIndex = message.operandExpressionIndex;
                if (message.stringTableIndex != null && message.hasOwnProperty("stringTableIndex"))
                    object.stringTableIndex = message.stringTableIndex;
                return object;
            };
    
            /**
             * Converts this Reference to JSON.
             * @function toJSON
             * @memberof BinExport2.Reference
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Reference.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Reference;
        })();
    
        BinExport2.DataReference = (function() {
    
            /**
             * Properties of a DataReference.
             * @memberof BinExport2
             * @interface IDataReference
             * @property {number|null} [instructionIndex] DataReference instructionIndex
             * @property {number|Long|null} [address] DataReference address
             */
    
            /**
             * Constructs a new DataReference.
             * @memberof BinExport2
             * @classdesc Represents a DataReference.
             * @implements IDataReference
             * @constructor
             * @param {BinExport2.IDataReference=} [properties] Properties to set
             */
            function DataReference(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DataReference instructionIndex.
             * @member {number} instructionIndex
             * @memberof BinExport2.DataReference
             * @instance
             */
            DataReference.prototype.instructionIndex = 0;
    
            /**
             * DataReference address.
             * @member {number|Long} address
             * @memberof BinExport2.DataReference
             * @instance
             */
            DataReference.prototype.address = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new DataReference instance using the specified properties.
             * @function create
             * @memberof BinExport2.DataReference
             * @static
             * @param {BinExport2.IDataReference=} [properties] Properties to set
             * @returns {BinExport2.DataReference} DataReference instance
             */
            DataReference.create = function create(properties) {
                return new DataReference(properties);
            };
    
            /**
             * Encodes the specified DataReference message. Does not implicitly {@link BinExport2.DataReference.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.DataReference
             * @static
             * @param {BinExport2.IDataReference} message DataReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DataReference.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.instructionIndex);
                if (message.address != null && message.hasOwnProperty("address"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.address);
                return writer;
            };
    
            /**
             * Encodes the specified DataReference message, length delimited. Does not implicitly {@link BinExport2.DataReference.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.DataReference
             * @static
             * @param {BinExport2.IDataReference} message DataReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DataReference.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DataReference message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.DataReference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.DataReference} DataReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DataReference.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.DataReference();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.instructionIndex = reader.int32();
                        break;
                    case 2:
                        message.address = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DataReference message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.DataReference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.DataReference} DataReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DataReference.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DataReference message.
             * @function verify
             * @memberof BinExport2.DataReference
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DataReference.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    if (!$util.isInteger(message.instructionIndex))
                        return "instructionIndex: integer expected";
                if (message.address != null && message.hasOwnProperty("address"))
                    if (!$util.isInteger(message.address) && !(message.address && $util.isInteger(message.address.low) && $util.isInteger(message.address.high)))
                        return "address: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a DataReference message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.DataReference
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.DataReference} DataReference
             */
            DataReference.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.DataReference)
                    return object;
                var message = new $root.BinExport2.DataReference();
                if (object.instructionIndex != null)
                    message.instructionIndex = object.instructionIndex | 0;
                if (object.address != null)
                    if ($util.Long)
                        (message.address = $util.Long.fromValue(object.address)).unsigned = true;
                    else if (typeof object.address === "string")
                        message.address = parseInt(object.address, 10);
                    else if (typeof object.address === "number")
                        message.address = object.address;
                    else if (typeof object.address === "object")
                        message.address = new $util.LongBits(object.address.low >>> 0, object.address.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a DataReference message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.DataReference
             * @static
             * @param {BinExport2.DataReference} message DataReference
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DataReference.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.instructionIndex = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.address = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.address = options.longs === String ? "0" : 0;
                }
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    object.instructionIndex = message.instructionIndex;
                if (message.address != null && message.hasOwnProperty("address"))
                    if (typeof message.address === "number")
                        object.address = options.longs === String ? String(message.address) : message.address;
                    else
                        object.address = options.longs === String ? $util.Long.prototype.toString.call(message.address) : options.longs === Number ? new $util.LongBits(message.address.low >>> 0, message.address.high >>> 0).toNumber(true) : message.address;
                return object;
            };
    
            /**
             * Converts this DataReference to JSON.
             * @function toJSON
             * @memberof BinExport2.DataReference
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DataReference.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DataReference;
        })();
    
        BinExport2.Comment = (function() {
    
            /**
             * Properties of a Comment.
             * @memberof BinExport2
             * @interface IComment
             * @property {number|null} [instructionIndex] Comment instructionIndex
             * @property {number|null} [stringTableIndex] Comment stringTableIndex
             * @property {boolean|null} [repeatable] Comment repeatable
             * @property {BinExport2.Comment.Type|null} [type] Comment type
             */
    
            /**
             * Constructs a new Comment.
             * @memberof BinExport2
             * @classdesc Represents a Comment.
             * @implements IComment
             * @constructor
             * @param {BinExport2.IComment=} [properties] Properties to set
             */
            function Comment(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Comment instructionIndex.
             * @member {number} instructionIndex
             * @memberof BinExport2.Comment
             * @instance
             */
            Comment.prototype.instructionIndex = 0;
    
            /**
             * Comment stringTableIndex.
             * @member {number} stringTableIndex
             * @memberof BinExport2.Comment
             * @instance
             */
            Comment.prototype.stringTableIndex = 0;
    
            /**
             * Comment repeatable.
             * @member {boolean} repeatable
             * @memberof BinExport2.Comment
             * @instance
             */
            Comment.prototype.repeatable = false;
    
            /**
             * Comment type.
             * @member {BinExport2.Comment.Type} type
             * @memberof BinExport2.Comment
             * @instance
             */
            Comment.prototype.type = 0;
    
            /**
             * Creates a new Comment instance using the specified properties.
             * @function create
             * @memberof BinExport2.Comment
             * @static
             * @param {BinExport2.IComment=} [properties] Properties to set
             * @returns {BinExport2.Comment} Comment instance
             */
            Comment.create = function create(properties) {
                return new Comment(properties);
            };
    
            /**
             * Encodes the specified Comment message. Does not implicitly {@link BinExport2.Comment.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Comment
             * @static
             * @param {BinExport2.IComment} message Comment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Comment.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.instructionIndex);
                if (message.stringTableIndex != null && message.hasOwnProperty("stringTableIndex"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.stringTableIndex);
                if (message.repeatable != null && message.hasOwnProperty("repeatable"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.repeatable);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.type);
                return writer;
            };
    
            /**
             * Encodes the specified Comment message, length delimited. Does not implicitly {@link BinExport2.Comment.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Comment
             * @static
             * @param {BinExport2.IComment} message Comment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Comment.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Comment message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Comment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Comment} Comment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Comment.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Comment();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.instructionIndex = reader.int32();
                        break;
                    case 4:
                        message.stringTableIndex = reader.int32();
                        break;
                    case 5:
                        message.repeatable = reader.bool();
                        break;
                    case 6:
                        message.type = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Comment message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Comment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Comment} Comment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Comment.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Comment message.
             * @function verify
             * @memberof BinExport2.Comment
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Comment.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    if (!$util.isInteger(message.instructionIndex))
                        return "instructionIndex: integer expected";
                if (message.stringTableIndex != null && message.hasOwnProperty("stringTableIndex"))
                    if (!$util.isInteger(message.stringTableIndex))
                        return "stringTableIndex: integer expected";
                if (message.repeatable != null && message.hasOwnProperty("repeatable"))
                    if (typeof message.repeatable !== "boolean")
                        return "repeatable: boolean expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a Comment message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Comment
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Comment} Comment
             */
            Comment.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Comment)
                    return object;
                var message = new $root.BinExport2.Comment();
                if (object.instructionIndex != null)
                    message.instructionIndex = object.instructionIndex | 0;
                if (object.stringTableIndex != null)
                    message.stringTableIndex = object.stringTableIndex | 0;
                if (object.repeatable != null)
                    message.repeatable = Boolean(object.repeatable);
                switch (object.type) {
                case "DEFAULT":
                case 0:
                    message.type = 0;
                    break;
                case "ANTERIOR":
                case 1:
                    message.type = 1;
                    break;
                case "POSTERIOR":
                case 2:
                    message.type = 2;
                    break;
                case "FUNCTION":
                case 3:
                    message.type = 3;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Comment message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Comment
             * @static
             * @param {BinExport2.Comment} message Comment
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Comment.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.instructionIndex = 0;
                    object.stringTableIndex = 0;
                    object.repeatable = false;
                    object.type = options.enums === String ? "DEFAULT" : 0;
                }
                if (message.instructionIndex != null && message.hasOwnProperty("instructionIndex"))
                    object.instructionIndex = message.instructionIndex;
                if (message.stringTableIndex != null && message.hasOwnProperty("stringTableIndex"))
                    object.stringTableIndex = message.stringTableIndex;
                if (message.repeatable != null && message.hasOwnProperty("repeatable"))
                    object.repeatable = message.repeatable;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.BinExport2.Comment.Type[message.type] : message.type;
                return object;
            };
    
            /**
             * Converts this Comment to JSON.
             * @function toJSON
             * @memberof BinExport2.Comment
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Comment.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Type enum.
             * @name BinExport2.Comment.Type
             * @enum {string}
             * @property {number} DEFAULT=0 DEFAULT value
             * @property {number} ANTERIOR=1 ANTERIOR value
             * @property {number} POSTERIOR=2 POSTERIOR value
             * @property {number} FUNCTION=3 FUNCTION value
             */
            Comment.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "DEFAULT"] = 0;
                values[valuesById[1] = "ANTERIOR"] = 1;
                values[valuesById[2] = "POSTERIOR"] = 2;
                values[valuesById[3] = "FUNCTION"] = 3;
                return values;
            })();
    
            return Comment;
        })();
    
        BinExport2.Section = (function() {
    
            /**
             * Properties of a Section.
             * @memberof BinExport2
             * @interface ISection
             * @property {number|Long|null} [address] Section address
             * @property {number|Long|null} [size] Section size
             * @property {boolean|null} [flagR] Section flagR
             * @property {boolean|null} [flagW] Section flagW
             * @property {boolean|null} [flagX] Section flagX
             */
    
            /**
             * Constructs a new Section.
             * @memberof BinExport2
             * @classdesc Represents a Section.
             * @implements ISection
             * @constructor
             * @param {BinExport2.ISection=} [properties] Properties to set
             */
            function Section(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Section address.
             * @member {number|Long} address
             * @memberof BinExport2.Section
             * @instance
             */
            Section.prototype.address = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Section size.
             * @member {number|Long} size
             * @memberof BinExport2.Section
             * @instance
             */
            Section.prototype.size = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Section flagR.
             * @member {boolean} flagR
             * @memberof BinExport2.Section
             * @instance
             */
            Section.prototype.flagR = false;
    
            /**
             * Section flagW.
             * @member {boolean} flagW
             * @memberof BinExport2.Section
             * @instance
             */
            Section.prototype.flagW = false;
    
            /**
             * Section flagX.
             * @member {boolean} flagX
             * @memberof BinExport2.Section
             * @instance
             */
            Section.prototype.flagX = false;
    
            /**
             * Creates a new Section instance using the specified properties.
             * @function create
             * @memberof BinExport2.Section
             * @static
             * @param {BinExport2.ISection=} [properties] Properties to set
             * @returns {BinExport2.Section} Section instance
             */
            Section.create = function create(properties) {
                return new Section(properties);
            };
    
            /**
             * Encodes the specified Section message. Does not implicitly {@link BinExport2.Section.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Section
             * @static
             * @param {BinExport2.ISection} message Section message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Section.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.address != null && message.hasOwnProperty("address"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.address);
                if (message.size != null && message.hasOwnProperty("size"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.size);
                if (message.flagR != null && message.hasOwnProperty("flagR"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.flagR);
                if (message.flagW != null && message.hasOwnProperty("flagW"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.flagW);
                if (message.flagX != null && message.hasOwnProperty("flagX"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.flagX);
                return writer;
            };
    
            /**
             * Encodes the specified Section message, length delimited. Does not implicitly {@link BinExport2.Section.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Section
             * @static
             * @param {BinExport2.ISection} message Section message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Section.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Section message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Section
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Section} Section
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Section.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Section();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.address = reader.uint64();
                        break;
                    case 2:
                        message.size = reader.uint64();
                        break;
                    case 3:
                        message.flagR = reader.bool();
                        break;
                    case 4:
                        message.flagW = reader.bool();
                        break;
                    case 5:
                        message.flagX = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Section message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Section
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Section} Section
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Section.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Section message.
             * @function verify
             * @memberof BinExport2.Section
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Section.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.address != null && message.hasOwnProperty("address"))
                    if (!$util.isInteger(message.address) && !(message.address && $util.isInteger(message.address.low) && $util.isInteger(message.address.high)))
                        return "address: integer|Long expected";
                if (message.size != null && message.hasOwnProperty("size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                if (message.flagR != null && message.hasOwnProperty("flagR"))
                    if (typeof message.flagR !== "boolean")
                        return "flagR: boolean expected";
                if (message.flagW != null && message.hasOwnProperty("flagW"))
                    if (typeof message.flagW !== "boolean")
                        return "flagW: boolean expected";
                if (message.flagX != null && message.hasOwnProperty("flagX"))
                    if (typeof message.flagX !== "boolean")
                        return "flagX: boolean expected";
                return null;
            };
    
            /**
             * Creates a Section message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Section
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Section} Section
             */
            Section.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Section)
                    return object;
                var message = new $root.BinExport2.Section();
                if (object.address != null)
                    if ($util.Long)
                        (message.address = $util.Long.fromValue(object.address)).unsigned = true;
                    else if (typeof object.address === "string")
                        message.address = parseInt(object.address, 10);
                    else if (typeof object.address === "number")
                        message.address = object.address;
                    else if (typeof object.address === "object")
                        message.address = new $util.LongBits(object.address.low >>> 0, object.address.high >>> 0).toNumber(true);
                if (object.size != null)
                    if ($util.Long)
                        (message.size = $util.Long.fromValue(object.size)).unsigned = true;
                    else if (typeof object.size === "string")
                        message.size = parseInt(object.size, 10);
                    else if (typeof object.size === "number")
                        message.size = object.size;
                    else if (typeof object.size === "object")
                        message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber(true);
                if (object.flagR != null)
                    message.flagR = Boolean(object.flagR);
                if (object.flagW != null)
                    message.flagW = Boolean(object.flagW);
                if (object.flagX != null)
                    message.flagX = Boolean(object.flagX);
                return message;
            };
    
            /**
             * Creates a plain object from a Section message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Section
             * @static
             * @param {BinExport2.Section} message Section
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Section.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.address = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.address = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.size = options.longs === String ? "0" : 0;
                    object.flagR = false;
                    object.flagW = false;
                    object.flagX = false;
                }
                if (message.address != null && message.hasOwnProperty("address"))
                    if (typeof message.address === "number")
                        object.address = options.longs === String ? String(message.address) : message.address;
                    else
                        object.address = options.longs === String ? $util.Long.prototype.toString.call(message.address) : options.longs === Number ? new $util.LongBits(message.address.low >>> 0, message.address.high >>> 0).toNumber(true) : message.address;
                if (message.size != null && message.hasOwnProperty("size"))
                    if (typeof message.size === "number")
                        object.size = options.longs === String ? String(message.size) : message.size;
                    else
                        object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber(true) : message.size;
                if (message.flagR != null && message.hasOwnProperty("flagR"))
                    object.flagR = message.flagR;
                if (message.flagW != null && message.hasOwnProperty("flagW"))
                    object.flagW = message.flagW;
                if (message.flagX != null && message.hasOwnProperty("flagX"))
                    object.flagX = message.flagX;
                return object;
            };
    
            /**
             * Converts this Section to JSON.
             * @function toJSON
             * @memberof BinExport2.Section
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Section.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Section;
        })();
    
        BinExport2.Library = (function() {
    
            /**
             * Properties of a Library.
             * @memberof BinExport2
             * @interface ILibrary
             * @property {boolean|null} [isStatic] Library isStatic
             * @property {number|Long|null} [loadAddress] Library loadAddress
             * @property {string|null} [name] Library name
             */
    
            /**
             * Constructs a new Library.
             * @memberof BinExport2
             * @classdesc Represents a Library.
             * @implements ILibrary
             * @constructor
             * @param {BinExport2.ILibrary=} [properties] Properties to set
             */
            function Library(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Library isStatic.
             * @member {boolean} isStatic
             * @memberof BinExport2.Library
             * @instance
             */
            Library.prototype.isStatic = false;
    
            /**
             * Library loadAddress.
             * @member {number|Long} loadAddress
             * @memberof BinExport2.Library
             * @instance
             */
            Library.prototype.loadAddress = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Library name.
             * @member {string} name
             * @memberof BinExport2.Library
             * @instance
             */
            Library.prototype.name = "";
    
            /**
             * Creates a new Library instance using the specified properties.
             * @function create
             * @memberof BinExport2.Library
             * @static
             * @param {BinExport2.ILibrary=} [properties] Properties to set
             * @returns {BinExport2.Library} Library instance
             */
            Library.create = function create(properties) {
                return new Library(properties);
            };
    
            /**
             * Encodes the specified Library message. Does not implicitly {@link BinExport2.Library.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Library
             * @static
             * @param {BinExport2.ILibrary} message Library message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Library.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.isStatic != null && message.hasOwnProperty("isStatic"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isStatic);
                if (message.loadAddress != null && message.hasOwnProperty("loadAddress"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.loadAddress);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                return writer;
            };
    
            /**
             * Encodes the specified Library message, length delimited. Does not implicitly {@link BinExport2.Library.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Library
             * @static
             * @param {BinExport2.ILibrary} message Library message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Library.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Library message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Library
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Library} Library
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Library.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Library();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.isStatic = reader.bool();
                        break;
                    case 2:
                        message.loadAddress = reader.uint64();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Library message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Library
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Library} Library
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Library.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Library message.
             * @function verify
             * @memberof BinExport2.Library
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Library.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.isStatic != null && message.hasOwnProperty("isStatic"))
                    if (typeof message.isStatic !== "boolean")
                        return "isStatic: boolean expected";
                if (message.loadAddress != null && message.hasOwnProperty("loadAddress"))
                    if (!$util.isInteger(message.loadAddress) && !(message.loadAddress && $util.isInteger(message.loadAddress.low) && $util.isInteger(message.loadAddress.high)))
                        return "loadAddress: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };
    
            /**
             * Creates a Library message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Library
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Library} Library
             */
            Library.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Library)
                    return object;
                var message = new $root.BinExport2.Library();
                if (object.isStatic != null)
                    message.isStatic = Boolean(object.isStatic);
                if (object.loadAddress != null)
                    if ($util.Long)
                        (message.loadAddress = $util.Long.fromValue(object.loadAddress)).unsigned = true;
                    else if (typeof object.loadAddress === "string")
                        message.loadAddress = parseInt(object.loadAddress, 10);
                    else if (typeof object.loadAddress === "number")
                        message.loadAddress = object.loadAddress;
                    else if (typeof object.loadAddress === "object")
                        message.loadAddress = new $util.LongBits(object.loadAddress.low >>> 0, object.loadAddress.high >>> 0).toNumber(true);
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };
    
            /**
             * Creates a plain object from a Library message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Library
             * @static
             * @param {BinExport2.Library} message Library
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Library.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.isStatic = false;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.loadAddress = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.loadAddress = options.longs === String ? "0" : 0;
                    object.name = "";
                }
                if (message.isStatic != null && message.hasOwnProperty("isStatic"))
                    object.isStatic = message.isStatic;
                if (message.loadAddress != null && message.hasOwnProperty("loadAddress"))
                    if (typeof message.loadAddress === "number")
                        object.loadAddress = options.longs === String ? String(message.loadAddress) : message.loadAddress;
                    else
                        object.loadAddress = options.longs === String ? $util.Long.prototype.toString.call(message.loadAddress) : options.longs === Number ? new $util.LongBits(message.loadAddress.low >>> 0, message.loadAddress.high >>> 0).toNumber(true) : message.loadAddress;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };
    
            /**
             * Converts this Library to JSON.
             * @function toJSON
             * @memberof BinExport2.Library
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Library.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Library;
        })();
    
        BinExport2.Module = (function() {
    
            /**
             * Properties of a Module.
             * @memberof BinExport2
             * @interface IModule
             * @property {string|null} [name] Module name
             */
    
            /**
             * Constructs a new Module.
             * @memberof BinExport2
             * @classdesc Represents a Module.
             * @implements IModule
             * @constructor
             * @param {BinExport2.IModule=} [properties] Properties to set
             */
            function Module(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Module name.
             * @member {string} name
             * @memberof BinExport2.Module
             * @instance
             */
            Module.prototype.name = "";
    
            /**
             * Creates a new Module instance using the specified properties.
             * @function create
             * @memberof BinExport2.Module
             * @static
             * @param {BinExport2.IModule=} [properties] Properties to set
             * @returns {BinExport2.Module} Module instance
             */
            Module.create = function create(properties) {
                return new Module(properties);
            };
    
            /**
             * Encodes the specified Module message. Does not implicitly {@link BinExport2.Module.verify|verify} messages.
             * @function encode
             * @memberof BinExport2.Module
             * @static
             * @param {BinExport2.IModule} message Module message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Module.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                return writer;
            };
    
            /**
             * Encodes the specified Module message, length delimited. Does not implicitly {@link BinExport2.Module.verify|verify} messages.
             * @function encodeDelimited
             * @memberof BinExport2.Module
             * @static
             * @param {BinExport2.IModule} message Module message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Module.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Module message from the specified reader or buffer.
             * @function decode
             * @memberof BinExport2.Module
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BinExport2.Module} Module
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Module.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BinExport2.Module();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Module message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof BinExport2.Module
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {BinExport2.Module} Module
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Module.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Module message.
             * @function verify
             * @memberof BinExport2.Module
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Module.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };
    
            /**
             * Creates a Module message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BinExport2.Module
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BinExport2.Module} Module
             */
            Module.fromObject = function fromObject(object) {
                if (object instanceof $root.BinExport2.Module)
                    return object;
                var message = new $root.BinExport2.Module();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };
    
            /**
             * Creates a plain object from a Module message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BinExport2.Module
             * @static
             * @param {BinExport2.Module} message Module
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Module.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };
    
            /**
             * Converts this Module to JSON.
             * @function toJSON
             * @memberof BinExport2.Module
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Module.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Module;
        })();
    
        return BinExport2;
    })();

    return $root;
});
